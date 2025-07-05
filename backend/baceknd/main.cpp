#include <iostream>
#include <vector>
#include <queue>
#include <climits>
using namespace std;

#define INF INT_MAX

void dijkstra(vector<vector<pair<int, int>>>& graph, int src) {
    int V = graph.size();
    vector<int> dist(V, INF);
    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;

    dist[src] = 0;
    pq.push({0, src});

    while (!pq.empty()) {
        int u = pq.top().second;
        pq.pop();

        for (auto& edge : graph[u]) {
            int v = edge.first;
            int weight = edge.second;

            if (dist[u] != INF && dist[u] + weight < dist[v]) {
                dist[v] = dist[u] + weight;
                pq.push({dist[v], v});
            }
        }
    }

    cout << "Vertex Distance from Source " << src << ":\n";
    for (int i = 0; i < V; i++) {
        cout << i << " \t " << (dist[i] == INF ? -1 : dist[i]) << "\n";
    }
}

int main() {
    int V = 5;
    vector<vector<pair<int, int>>> graph(V);

    // Example graph setup
    graph[0].push_back({1, 2});
    graph[0].push_back({2, 4});
    graph[1].push_back({2, 1});
    graph[1].push_back({3, 7});
    graph[2].push_back({3, 3});
    graph[3].push_back({4, 1});

    dijkstra(graph, 0);

    return 0;
}
