# Graph Report - hotel-price-checker  (2026-07-12)

## Corpus Check
- 7 files · ~16,873 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 50 nodes · 44 edges · 9 communities (7 shown, 2 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `60f5c919`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]

## God Nodes (most connected - your core abstractions)
1. `scripts` - 3 edges
2. `fetchWithRetry()` - 2 edges
3. `worker()` - 2 edges
4. `main` - 1 edges
5. `dev` - 1 edges
6. `axios` - 1 edges
7. `cors` - 1 edges
8. `express` - 1 edges
9. `googleapis` - 1 edges
10. `xlsx` - 1 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Communities (9 total, 2 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.15
Nodes (12): apiClient, app, axios, cors, express, fs, { google }, http (+4 more)

### Community 1 - "Community 1"
Cohesion: 0.25
Nodes (7): description, main, name, scripts, dev, start, version

### Community 2 - "Community 2"
Cohesion: 0.33
Nodes (6): dependencies, axios, cors, express, googleapis, xlsx

### Community 3 - "Community 3"
Cohesion: 0.50
Nodes (3): builds, routes, version

### Community 6 - "Community 6"
Cohesion: 0.40
Nodes (3): axios, plbMonthNames, XLSX

### Community 8 - "Community 8"
Cohesion: 0.40
Nodes (3): axios, sheets, XLSX

## Knowledge Gaps
- **34 isolated node(s):** `name`, `version`, `description`, `main`, `start` (+29 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `Community 2` to `Community 1`?**
  _High betweenness centrality (0.043) - this node is a cross-community bridge._
- **What connects `name`, `version`, `description` to the rest of the system?**
  _34 weakly-connected nodes found - possible documentation gaps or missing edges._