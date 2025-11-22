'use client';

import React, { useEffect, useState } from 'react';
import GraphCanvas from '@/components/network-graph/GraphCanvas';
import ControlBar from '@/components/network-graph/ControlBar';
import EntityDetails from '@/components/network-graph/EntityDetails';

// Import JSON data directly
const entitiesData = require('../../public/data/entities.json');
const relationshipsData = require('../../public/data/relationships.json');
const metadataInfo = require('../../public/data/metadata.json');

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

export default function NetworkGraphPage() {
  const [entities, setEntities] = useState<Entity[]>([]);
  const [relationships, setRelationships] = useState<Relationship[]>([]);
  const [metadata, setMetadata] = useState<any>(null);
  const [filteredEntities, setFilteredEntities] = useState<Entity[]>([]);
  const [filteredRelationships, setFilteredRelationships] = useState<Relationship[]>([]);
  const [selectedEntity, setSelectedEntity] = useState<Entity | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [entityTypeFilters, setEntityTypeFilters] = useState<string[]>(['person', 'organization']);
  const [relationshipTypeFilters, setRelationshipTypeFilters] = useState<string[]>([]);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [layoutType, setLayoutType] = useState<'force' | 'hierarchical'>('force');
  const [descriptionCollapsed, setDescriptionCollapsed] = useState(false);

  useEffect(() => {
    // Load data
    setEntities(entitiesData as Entity[]);
    setRelationships(relationshipsData as Relationship[]);
    setMetadata(metadataInfo);
    setFilteredEntities(entitiesData as Entity[]);
    setFilteredRelationships(relationshipsData as Relationship[]);

    // Get all unique relationship types for filter
    const relationTypes = [...new Set(relationshipsData.map((r: any) => r.type))];
    setRelationshipTypeFilters(relationTypes);
  }, []);

  useEffect(() => {
    // Apply filters
    let filteredEnts = entities;
    let filteredRels = relationships;

    // Filter by search term
    if (searchTerm) {
      filteredEnts = filteredEnts.filter(e => 
        e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by entity type
    if (entityTypeFilters.length > 0) {
      filteredEnts = filteredEnts.filter(e => entityTypeFilters.includes(e.type));
    }

    // Filter relationships to only show those between filtered entities
    const filteredEntityIds = new Set(filteredEnts.map(e => e.id));
    filteredRels = filteredRels.filter(r => 
      filteredEntityIds.has(r.source) && filteredEntityIds.has(r.target)
    );

    // Filter by relationship type
    if (relationshipTypeFilters.length > 0) {
      filteredRels = filteredRels.filter(r => relationshipTypeFilters.includes(r.type));
    }

    setFilteredEntities(filteredEnts);
    setFilteredRelationships(filteredRels);
  }, [searchTerm, entityTypeFilters, relationshipTypeFilters, entities, relationships]);

  const handleEntitySelect = (entity: Entity | null) => {
    setSelectedEntity(entity);
  };

  const handleZoom = (direction: 'in' | 'out' | 'reset') => {
    if (direction === 'in') {
      setZoomLevel(prev => Math.min(prev * 1.2, 3));
    } else if (direction === 'out') {
      setZoomLevel(prev => Math.max(prev * 0.8, 0.3));
    } else {
      setZoomLevel(1);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <header className="border-b border-gray-200 px-6 py-8">
        <h1 className="text-3xl font-bold text-gray-900">Financial Network Analysis</h1>
        <p className="mt-2 text-gray-600">
          Interactive visualization of the Qi Card ecosystem and militia financing networks
        </p>
      </header>

      {/* Description Bar */}
      <div className={`border-b border-gray-200 px-6 py-4 bg-gray-50 transition-all duration-300 ${
        descriptionCollapsed ? 'h-12' : 'h-auto'
      }`}>
        <div className="flex items-center justify-between">
          <div className={`${descriptionCollapsed ? 'hidden' : 'block'}`}>
            {metadata && (
              <div className="space-y-1 text-sm text-gray-700">
                <p>
                  <span className="font-semibold">{metadata.statistics.totalEntities} Entities:</span>{' '}
                  {metadata.statistics.entityBreakdown.person} Persons •{' '}
                  {metadata.statistics.entityBreakdown.organization} Organizations
                </p>
                <p>
                  <span className="font-semibold">{metadata.statistics.totalRelationships}+ Documented Relationships:</span>{' '}
                  {metadata.statistics.relationshipBreakdown.financial} Financial Links •{' '}
                  {metadata.statistics.relationshipBreakdown.control} Control Structures •{' '}
                  {metadata.statistics.relationshipBreakdown.sanctions} Sanctions Actions
                </p>
              </div>
            )}
          </div>
          <button
            onClick={() => setDescriptionCollapsed(!descriptionCollapsed)}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg
              className={`w-5 h-5 transform transition-transform ${descriptionCollapsed ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Control Bar */}
      <ControlBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        entityTypeFilters={entityTypeFilters}
        onEntityTypeFilterChange={setEntityTypeFilters}
        relationshipTypeFilters={relationshipTypeFilters}
        onRelationshipTypeFilterChange={setRelationshipTypeFilters}
        onZoom={handleZoom}
        layoutType={layoutType}
        onLayoutChange={setLayoutType}
      />

      {/* Main Content Area */}
      <div className="relative" style={{ height: 'calc(100vh - 280px)' }}>
        {/* Graph Canvas */}
        <GraphCanvas
          entities={filteredEntities}
          relationships={filteredRelationships}
          selectedEntity={selectedEntity}
          onEntitySelect={handleEntitySelect}
          zoomLevel={zoomLevel}
          layoutType={layoutType}
        />

        {/* Entity Details Panel */}
        {selectedEntity && (
          <EntityDetails
            entity={selectedEntity}
            relationships={filteredRelationships}
            allEntities={entities}
            onClose={() => setSelectedEntity(null)}
          />
        )}
      </div>
    </div>
  );
}
