'use client';

import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface Entity {
  id: string;
  name: string;
  type: string;
  title: string;
  connectionCount: number;
  keyFacts: string[];
}

interface Relationship {
  source: string;
  target: string;
  type: string;
  description: string;
  strength: number;
  dateRange: string;
}

// Extend Entity to include D3 simulation properties
interface SimulationNode extends Entity, d3.SimulationNodeDatum {}

interface SimulationLink extends d3.SimulationLinkDatum<SimulationNode> {
  type: string;
  description: string;
  strength: number;
  dateRange: string;
}

interface GraphCanvasProps {
  entities: Entity[];
  relationships: Relationship[];
  selectedEntity: Entity | null;
  onEntitySelect: (entity: Entity | null) => void;
  zoomLevel: number;
  layoutType: 'force' | 'hierarchical';
}

export default function GraphCanvas({
  entities,
  relationships,
  selectedEntity,
  onEntitySelect,
  zoomLevel,
  layoutType
}: GraphCanvasProps) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const simulationRef = useRef<d3.Simulation<SimulationNode, SimulationLink> | null>(null);

  useEffect(() => {
    if (!svgRef.current || entities.length === 0) return;

    const svg = d3.select(svgRef.current);
    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;

    // Clear previous content
    svg.selectAll('*').remove();

    // Create container for zoom/pan
    const g = svg.append('g');

    // Define arrow markers for directed edges
    svg.append('defs').selectAll('marker')
      .data(['arrow'])
      .enter().append('marker')
      .attr('id', d => d)
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 25)
      .attr('refY', 0)
      .attr('markerWidth', 6)
      .attr('markerHeight', 6)
      .attr('orient', 'auto')
      .append('path')
      .attr('d', 'M0,-5L10,0L0,5')
      .attr('fill', '#999');

    // Create zoom behavior
    const zoom = d3.zoom()
      .scaleExtent([0.3, 3])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
      });

    svg.call(zoom as any);

    // Prepare data - cast entities to SimulationNode
    const nodes: SimulationNode[] = entities.map(e => ({ ...e }));
    const links: SimulationLink[] = relationships.map(r => ({
      source: r.source,
      target: r.target,
      type: r.type,
      description: r.description,
      strength: r.strength,
      dateRange: r.dateRange
    }));

    // Create force simulation
    const simulation = d3.forceSimulation<SimulationNode>(nodes)
      .force('link', d3.forceLink<SimulationNode, SimulationLink>(links)
        .id((d: SimulationNode) => d.id)
        .distance(d => 150 - (d.strength * 5)))
      .force('charge', d3.forceManyBody().strength(-500))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius((d: any) => 
        10 + (d.connectionCount * 2)));

    simulationRef.current = simulation;

    // Create links (edges)
    const link = g.append('g')
      .attr('class', 'links')
      .selectAll('line')
      .data(links)
      .enter().append('line')
      .attr('stroke', '#d0d0d0')
      .attr('stroke-width', (d: SimulationLink) => Math.min(d.strength / 3, 3))
      .attr('marker-end', 'url(#arrow)');

    // Create link labels
    const linkLabel = g.append('g')
      .attr('class', 'link-labels')
      .selectAll('text')
      .data(links)
      .enter().append('text')
      .attr('class', 'link-label')
      .attr('font-size', '10px')
      .attr('fill', '#666')
      .attr('text-anchor', 'middle')
      .text((d: SimulationLink) => d.type);

    // Create nodes
    const node = g.append('g')
      .attr('class', 'nodes')
      .selectAll('g')
      .data(nodes)
      .enter().append('g')
      .attr('class', 'node-group')
      .call(d3.drag<SVGGElement, SimulationNode>()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended));

    // Add circles for nodes
    node.append('circle')
      .attr('r', (d: SimulationNode) => 10 + Math.min(d.connectionCount * 1.5, 30))
      .attr('fill', '#f5f5f5')
      .attr('stroke', (d: SimulationNode) => {
        if (selectedEntity && d.id === selectedEntity.id) return '#000';
        return '#333';
      })
      .attr('stroke-width', (d: SimulationNode) => {
        if (selectedEntity && d.id === selectedEntity.id) return 2;
        return 1;
      })
      .style('cursor', 'pointer');

    // Add labels for nodes
    node.append('text')
      .attr('dx', (d: SimulationNode) => 15 + Math.min(d.connectionCount * 1.5, 30))
      .attr('dy', 4)
      .attr('font-size', '12px')
      .attr('fill', '#333')
      .style('pointer-events', 'none')
      .text((d: SimulationNode) => d.name);

    // Add hover effect
    node.on('mouseenter', function(event, d: SimulationNode) {
      d3.select(this).select('circle')
        .transition()
        .duration(200)
        .attr('fill', '#e0e0e0');
      
      // Show tooltip
      const tooltip = d3.select('body').append('div')
        .attr('class', 'graph-tooltip')
        .style('position', 'absolute')
        .style('background', 'white')
        .style('border', '1px solid #ddd')
        .style('border-radius', '4px')
        .style('padding', '8px')
        .style('font-size', '12px')
        .style('pointer-events', 'none')
        .style('opacity', 0);

      tooltip.html(`
        <div style="font-weight: bold">${d.name}</div>
        <div style="color: #666">${d.title}</div>
        <div style="color: #999">Connections: ${d.connectionCount}</div>
      `)
      .style('left', (event.pageX + 10) + 'px')
      .style('top', (event.pageY - 10) + 'px')
      .transition()
      .duration(200)
      .style('opacity', 1);
    });

    node.on('mouseleave', function(event, d: SimulationNode) {
      d3.select(this).select('circle')
        .transition()
        .duration(200)
        .attr('fill', '#f5f5f5');
      
      d3.selectAll('.graph-tooltip').remove();
    });

    // Add click handler
    node.on('click', function(event, d: SimulationNode) {
      event.stopPropagation();
      onEntitySelect(d);
    });

    // Click on background to deselect
    svg.on('click', () => {
      onEntitySelect(null);
    });

    // Update positions on simulation tick
    simulation.on('tick', () => {
      link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y);

      linkLabel
        .attr('x', (d: any) => (d.source.x + d.target.x) / 2)
        .attr('y', (d: any) => (d.source.y + d.target.y) / 2);

      node.attr('transform', (d: SimulationNode) => `translate(${d.x},${d.y})`);
    });

    // Drag functions
    function dragstarted(event: d3.D3DragEvent<SVGGElement, SimulationNode, SimulationNode>, d: SimulationNode) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event: d3.D3DragEvent<SVGGElement, SimulationNode, SimulationNode>, d: SimulationNode) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event: d3.D3DragEvent<SVGGElement, SimulationNode, SimulationNode>, d: SimulationNode) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    // Apply zoom level
    svg.call(zoom.transform as any, d3.zoomIdentity.scale(zoomLevel));

    // Cleanup on unmount
    return () => {
      if (simulationRef.current) {
        simulationRef.current.stop();
      }
      d3.selectAll('.graph-tooltip').remove();
    };
  }, [entities, relationships, selectedEntity, onEntitySelect, layoutType, zoomLevel]);

  return (
    <svg
      ref={svgRef}
      className="w-full h-full"
      style={{ background: 'white' }}
    />
  );
}
