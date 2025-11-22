'use client';

import React from 'react';

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

interface EntityDetailsProps {
  entity: Entity;
  relationships: Relationship[];
  allEntities: Entity[];
  onClose: () => void;
}

export default function EntityDetails({
  entity,
  relationships,
  allEntities,
  onClose
}: EntityDetailsProps) {
  // Find relationships involving this entity
  const entityRelationships = relationships.filter(
    r => r.source === entity.id || r.target === entity.id
  );

  // Get connected entities
  const connectedEntities = entityRelationships.map(r => {
    const connectedId = r.source === entity.id ? r.target : r.source;
    const connectedEntity = allEntities.find(e => e.id === connectedId);
    const relationshipType = r.type;
    const direction = r.source === entity.id ? 'to' : 'from';
    return {
      entity: connectedEntity,
      relationship: r,
      direction
    };
  }).filter(item => item.entity);

  // Group by relationship type
  const groupedRelationships = connectedEntities.reduce((acc: any, item) => {
    const type = item.relationship.type;
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(item);
    return acc;
  }, {});

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-300 shadow-lg z-20">
      <div className="max-h-64 overflow-y-auto p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{entity.name}</h3>
            <p className="text-sm text-gray-600 mt-1">
              <span className="capitalize">{entity.type}</span> • {entity.title}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Key Facts */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Key Facts</h4>
          <ul className="space-y-1">
            {entity.keyFacts.map((fact, index) => (
              <li key={index} className="text-sm text-gray-600 flex items-start">
                <span className="text-gray-400 mr-2">•</span>
                <span>{fact}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Connected Entities */}
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-2">
            Connected Entities ({connectedEntities.length})
          </h4>
          <div className="space-y-3">
            {Object.entries(groupedRelationships).map(([type, items]: [string, any]) => (
              <div key={type}>
                <h5 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                  {type}
                </h5>
                <div className="space-y-1">
                  {items.map((item: any, index: number) => (
                    <div key={index} className="text-sm text-gray-600 pl-2">
                      <span className="font-medium">{item.entity.name}</span>
                      {item.relationship.description && (
                        <span className="text-gray-500"> — {item.relationship.description}</span>
                      )}
                      {item.relationship.dateRange && (
                        <span className="text-xs text-gray-400 ml-2">({item.relationship.dateRange})</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
