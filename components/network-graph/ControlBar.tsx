'use client';

import React, { useState } from 'react';

interface ControlBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  entityTypeFilters: string[];
  onEntityTypeFilterChange: (types: string[]) => void;
  relationshipTypeFilters: string[];
  onRelationshipTypeFilterChange: (types: string[]) => void;
  onZoom: (direction: 'in' | 'out' | 'reset') => void;
  layoutType: 'force' | 'hierarchical';
  onLayoutChange: (type: 'force' | 'hierarchical') => void;
}

export default function ControlBar({
  searchTerm,
  onSearchChange,
  entityTypeFilters,
  onEntityTypeFilterChange,
  relationshipTypeFilters,
  onRelationshipTypeFilterChange,
  onZoom,
  layoutType,
  onLayoutChange
}: ControlBarProps) {
  const [entityDropdownOpen, setEntityDropdownOpen] = useState(false);
  const [relationshipDropdownOpen, setRelationshipDropdownOpen] = useState(false);

  const entityTypes = ['person', 'organization'];
  const relationshipTypes = ['financial', 'ownership', 'control', 'founded', 'acquisition', 
    'partnership', 'sanctions', 'leadership', 'political', 'legal', 'criminal', 'membership', 'alleged'];

  const toggleEntityType = (type: string) => {
    if (entityTypeFilters.includes(type)) {
      onEntityTypeFilterChange(entityTypeFilters.filter(t => t !== type));
    } else {
      onEntityTypeFilterChange([...entityTypeFilters, type]);
    }
  };

  const toggleRelationshipType = (type: string) => {
    if (relationshipTypeFilters.includes(type)) {
      onRelationshipTypeFilterChange(relationshipTypeFilters.filter(t => t !== type));
    } else {
      onRelationshipTypeFilterChange([...relationshipTypeFilters, type]);
    }
  };

  return (
    <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Search Input */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search entities..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-64 px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
            <svg
              className="absolute right-3 top-2 w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Entity Type Filter */}
          <div className="relative">
            <button
              onClick={() => setEntityDropdownOpen(!entityDropdownOpen)}
              className="px-3 py-1.5 text-sm border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-gray-400"
            >
              Entity Types ({entityTypeFilters.length})
              <svg
                className="inline-block ml-2 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {entityDropdownOpen && (
              <div className="absolute top-full mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-20">
                {entityTypes.map(type => (
                  <label key={type} className="flex items-center px-3 py-2 hover:bg-gray-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={entityTypeFilters.includes(type)}
                      onChange={() => toggleEntityType(type)}
                      className="mr-2"
                    />
                    <span className="text-sm capitalize">{type}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Relationship Type Filter */}
          <div className="relative">
            <button
              onClick={() => setRelationshipDropdownOpen(!relationshipDropdownOpen)}
              className="px-3 py-1.5 text-sm border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-gray-400"
            >
              Relationships ({relationshipTypeFilters.length})
              <svg
                className="inline-block ml-2 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {relationshipDropdownOpen && (
              <div className="absolute top-full mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-20">
                <div className="max-h-64 overflow-y-auto">
                  {relationshipTypes.map(type => (
                    <label key={type} className="flex items-center px-3 py-2 hover:bg-gray-50 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={relationshipTypeFilters.includes(type)}
                        onChange={() => toggleRelationshipType(type)}
                        className="mr-2"
                      />
                      <span className="text-sm capitalize">{type}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Layout Toggle */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Layout:</span>
            <button
              onClick={() => onLayoutChange('force')}
              className={`px-2 py-1 text-sm rounded ${
                layoutType === 'force' 
                  ? 'bg-gray-800 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Force
            </button>
            <button
              onClick={() => onLayoutChange('hierarchical')}
              className={`px-2 py-1 text-sm rounded ${
                layoutType === 'hierarchical' 
                  ? 'bg-gray-800 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Hierarchical
            </button>
          </div>

          {/* Zoom Controls */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Zoom:</span>
            <button
              onClick={() => onZoom('out')}
              className="px-2 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300 focus:outline-none"
            >
              −
            </button>
            <button
              onClick={() => onZoom('reset')}
              className="px-2 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300 focus:outline-none"
            >
              Reset
            </button>
            <button
              onClick={() => onZoom('in')}
              className="px-2 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300 focus:outline-none"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Click outside to close dropdowns */}
      {(entityDropdownOpen || relationshipDropdownOpen) && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => {
            setEntityDropdownOpen(false);
            setRelationshipDropdownOpen(false);
          }}
        />
      )}
    </div>
  );
}
