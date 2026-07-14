# Graph Report - hotel-price-checker  (2026-07-14)

## Corpus Check
- 27 files · ~22,647 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 127 nodes · 101 edges · 27 communities (7 shown, 20 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `f90a95da`
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
- [[_COMMUNITY_Community 15|Community 15]]
- [[_COMMUNITY_Community 16|Community 16]]
- [[_COMMUNITY_Community 17|Community 17]]
- [[_COMMUNITY_Community 18|Community 18]]
- [[_COMMUNITY_Community 19|Community 19]]
- [[_COMMUNITY_Community 20|Community 20]]
- [[_COMMUNITY_Community 21|Community 21]]
- [[_COMMUNITY_Community 22|Community 22]]
- [[_COMMUNITY_Community 23|Community 23]]
- [[_COMMUNITY_Community 24|Community 24]]
- [[_COMMUNITY_Community 25|Community 25]]
- [[_COMMUNITY_Community 26|Community 26]]

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

## Communities (27 total, 20 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.14
Nodes (14): apiClient, app, axios, cors, express, fetchWithRetry(), fs, { google } (+6 more)

### Community 1 - "Community 1"
Cohesion: 0.14
Nodes (13): dependencies, axios, cors, express, googleapis, xlsx, description, main (+5 more)

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
- **71 isolated node(s):** `name`, `version`, `description`, `main`, `start` (+66 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **20 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What connects `name`, `version`, `description` to the rest of the system?**
  _71 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.14285714285714285 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.14285714285714285 - nodes in this community are weakly interconnected._