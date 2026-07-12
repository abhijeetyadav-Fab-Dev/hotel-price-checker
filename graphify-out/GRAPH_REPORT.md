# Graph Report - hotel-price-checker  (2026-07-12)

## Corpus Check
- 14 files · ~19,192 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 79 nodes · 66 edges · 15 communities (8 shown, 7 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `c33c836e`
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
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_Community 13|Community 13]]
- [[_COMMUNITY_Community 14|Community 14]]

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

## Communities (15 total, 7 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.14
Nodes (14): apiClient, app, axios, cors, express, fetchWithRetry(), fs, { google } (+6 more)

### Community 1 - "Community 1"
Cohesion: 0.25
Nodes (7): description, main, name, scripts, dev, start, version

### Community 2 - "Community 2"
Cohesion: 0.33
Nodes (6): dependencies, axios, cors, express, googleapis, xlsx

### Community 3 - "Community 3"
Cohesion: 0.50
Nodes (3): builds, routes, version

### Community 4 - "Community 4"
Cohesion: 0.40
Nodes (3): axios, sheets, XLSX

### Community 6 - "Community 6"
Cohesion: 0.40
Nodes (3): axios, plbMonthNames, XLSX

### Community 8 - "Community 8"
Cohesion: 0.40
Nodes (3): axios, sheets, XLSX

## Knowledge Gaps
- **49 isolated node(s):** `name`, `version`, `description`, `main`, `start` (+44 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **7 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `Community 2` to `Community 1`?**
  _High betweenness centrality (0.017) - this node is a cross-community bridge._
- **What connects `name`, `version`, `description` to the rest of the system?**
  _49 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.14285714285714285 - nodes in this community are weakly interconnected._