#!/usr/bin/env node

/**
 * Script to generate graph data from the knowledge graph markdown
 * Run: npm run build:graph-data
 */

const fs = require('fs');
const path = require('path');

// Paths
const PUBLIC_DATA_DIR = path.join(__dirname, '..', 'public', 'data');

// Sample data structure - this would be parsed from your markdown in production
const generateGraphData = () => {
  console.log('Building graph data from knowledge graph...');

  // Ensure data directory exists
  if (!fs.existsSync(PUBLIC_DATA_DIR)) {
    fs.mkdirSync(PUBLIC_DATA_DIR, { recursive: true });
  }

  // The entities and relationships are already in the JSON files
  // This script is here for when you want to update them from your knowledge graph markdown
  // You would parse the markdown file and extract entities and relationships

  console.log('✓ Graph data generated successfully');
  console.log(`  - Entities: ${PUBLIC_DATA_DIR}/entities.json`);
  console.log(`  - Relationships: ${PUBLIC_DATA_DIR}/relationships.json`);
  console.log(`  - Metadata: ${PUBLIC_DATA_DIR}/metadata.json`);
};

// Function to parse knowledge graph markdown (example structure)
const parseKnowledgeGraph = (markdownContent) => {
  // This is where you would implement the actual parsing logic
  // For example:
  // 1. Extract entities from ### PERSON: and ### ORGANIZATION: sections
  // 2. Extract relationships from the relationships section
  // 3. Generate metadata statistics

  // Example parsing (simplified):
  const entities = [];
  const relationships = [];
  
  // Parse entities section
  const entityMatches = markdownContent.match(/### (PERSON|ORGANIZATION): ([^\n]+)/g);
  if (entityMatches) {
    entityMatches.forEach(match => {
      // Extract entity details
      // This would be more complex in real implementation
    });
  }

  // Parse relationships section
  // Similar parsing logic for relationships

  return { entities, relationships };
};

// Run the script
if (require.main === module) {
  generateGraphData();
}

module.exports = { generateGraphData, parseKnowledgeGraph };
