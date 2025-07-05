import React, { useState } from 'react';
import './CodePlayground.css';

const CodePlayground = () => {
  const [code, setCode] = useState(`#include <iostream>
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

    cout << "Vertex Distance from Source " << src << ":\\n";
    for (int i = 0; i < V; i++) {
        cout << i << " \\t " << (dist[i] == INF ? -1 : dist[i]) << "\\n";
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
}`);
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const runCode = async () => {
    setLoading(true);
    try {
      // Use environment variable for backend URL, fallback to same origin in production
      const backendUrl = process.env.REACT_APP_BACKEND_URL || (process.env.NODE_ENV === 'production' ? '' : 'http://localhost:5000');
      const response = await fetch(`${backendUrl}/api/cpp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });

      const result = await response.json();

      if (result.status === 'success') {
        setOutput(result.stdout);
      } else {
        setOutput(result.stderr || result.message);
      }
    } catch (error) {
      setOutput('Error: Could not connect to backend server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="playground-page">
      <div className="playground-container">
        <div className="hero-section">
          <h1 className="page-title">Code Playground</h1>
          <p className="page-subtitle">Write and execute your own pathfinding algorithms</p>
        </div>

        <div className="playground-content">
          <div className="editor-section glass-card">
            <div className="editor-header">
              <h3>C++ Code Editor</h3>
              <button
                className="modern-btn primary"
                onClick={runCode}
                disabled={loading}
              >
                {loading ? 'Running...' : 'Run Code 🚀'}
              </button>
            </div>

            <textarea
              className="code-editor"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Write your C++ code here..."
            />
          </div>

          <div className="output-section glass-card">
            <h3>Output</h3>
            <pre className="code-output">{output || 'Click "Run Code" to see output here...'}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodePlayground;
