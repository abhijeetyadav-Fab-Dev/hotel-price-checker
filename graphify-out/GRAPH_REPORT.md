# Graph Report - hotel-price-checker  (2026-07-11)

## Corpus Check
- 4 files · ~12,609 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 31 nodes · 28 edges · 6 communities (5 shown, 1 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `b1c33931`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]

## God Nodes (most connected - your core abstractions)
1. `scripts` - 3 edges
2. `fetchWithRetry()` - 2 edges
3. `worker()` - 2 edges
4. `main` - 1 edges
5. `dev` - 1 edges
6. `axios` - 1 edges
7. `cors` - 1 edges
8. `express` - 1 edges
9. `xlsx` - 1 edges
10. `express` - 1 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Communities (6 total, 1 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.18
Nodes (10): apiClient, app, axios, cors, express, http, httpAgent, https (+2 more)

### Community 1 - "Community 1"
Cohesion: 0.25
Nodes (7): description, main, name, scripts, dev, start, version

### Community 2 - "Community 2"
Cohesion: 0.40
Nodes (5): dependencies, axios, cors, express, xlsx

### Community 3 - "Community 3"
Cohesion: 0.50
Nodes (3): builds, routes, version

## Knowledge Gaps
- **23 isolated node(s):** `name`, `version`, `description`, `main`, `start` (+18 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `Community 2` to `Community 1`?**
  _High betweenness centrality (0.087) - this node is a cross-community bridge._
- **What connects `name`, `version`, `description` to the rest of the system?**
  _23 weakly-connected nodes found - possible documentation gaps or missing edges._