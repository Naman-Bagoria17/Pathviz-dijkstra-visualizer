import React, { useState, useEffect, useCallback } from 'react';
import './VisualizerPage.css';

const VisualizerPage = () => {
  const [grid, setGrid] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [algorithm] = useState('dijkstra');
  const [speed, setSpeed] = useState(50);
  const [startNode, setStartNode] = useState({ row: 10, col: 15 });
  const [endNode, setEndNode] = useState({ row: 10, col: 35 });
  const [isMousePressed, setIsMousePressed] = useState(false);
  const [currentTool, setCurrentTool] = useState('wall');
  const [isSettingStart, setIsSettingStart] = useState(false);
  const [isSettingEnd, setIsSettingEnd] = useState(false);

  const GRID_ROWS = 25;
  const GRID_COLS = 50;

  // Initialize grid
  useEffect(() => {
    const initialGrid = [];
    for (let row = 0; row < GRID_ROWS; row++) {
      const currentRow = [];
      for (let col = 0; col < GRID_COLS; col++) {
        currentRow.push({
          row,
          col,
          isStart: row === startNode.row && col === startNode.col,
          isEnd: row === endNode.row && col === endNode.col,
          isWall: false,
          isVisited: false,
          isPath: false,
          distance: Infinity,
          previousNode: null
        });
      }
      initialGrid.push(currentRow);
    }
    setGrid(initialGrid);
  }, [startNode, endNode]);

  const clearGrid = useCallback(() => {
    if (isRunning) return;

    const newGrid = grid.map(row =>
      row.map(node => ({
        ...node,
        isVisited: false,
        isPath: false,
        distance: Infinity,
        previousNode: null
      }))
    );
    setGrid(newGrid);
  }, [grid, isRunning]);

  const clearWalls = useCallback(() => {
    if (isRunning) return;

    const newGrid = grid.map(row =>
      row.map(node => ({
        ...node,
        isWall: false,
        isVisited: false,
        isPath: false,
        distance: Infinity,
        previousNode: null
      }))
    );
    setGrid(newGrid);
  }, [grid, isRunning]);

  const handleMouseDown = (row, col) => {
    if (isRunning) return;
    setIsMousePressed(true);
    handleNodeClick(row, col);
  };

  const handleMouseEnter = (row, col) => {
    if (!isMousePressed || isRunning) return;
    handleNodeClick(row, col);
  };

  const handleMouseUp = () => {
    setIsMousePressed(false);
  };

  const handleNodeClick = (row, col) => {
    const node = grid[row][col];

    if (isSettingStart) {
      // Set new start node
      const newGrid = grid.map(gridRow =>
        gridRow.map(gridNode => ({
          ...gridNode,
          isStart: gridNode.row === row && gridNode.col === col,
          isVisited: false,
          isPath: false
        }))
      );
      setGrid(newGrid);
      setStartNode({ row, col });
      setIsSettingStart(false);
      return;
    }

    if (isSettingEnd) {
      // Set new end node
      const newGrid = grid.map(gridRow =>
        gridRow.map(gridNode => ({
          ...gridNode,
          isEnd: gridNode.row === row && gridNode.col === col,
          isVisited: false,
          isPath: false
        }))
      );
      setGrid(newGrid);
      setEndNode({ row, col });
      setIsSettingEnd(false);
      return;
    }

    if (node.isStart || node.isEnd) return;

    if (currentTool === 'wall') {
      const newGrid = [...grid];
      newGrid[row][col] = {
        ...node,
        isWall: !node.isWall,
        isVisited: false,
        isPath: false
      };
      setGrid(newGrid);
    }
  };

  const visualizeDijkstra = async () => {
    if (isRunning) return;

    setIsRunning(true);

    // Clear previous visualization and prepare for real-time animation
    const cleanGrid = grid.map(row =>
      row.map(node => ({
        ...node,
        isVisited: false,
        isPath: false,
        distance: Infinity,
        previousNode: null
      }))
    );
    setGrid(cleanGrid);

    // Wait a moment for the clear to render, then start real-time animation
    setTimeout(() => {
      runDijkstraStepByStep(cleanGrid);
    }, 100);
  };

  const runDijkstraStepByStep = (initialGrid) => {
    // Create working grid
    const workingGrid = initialGrid.map(row => [...row]);
    const startNodeObj = workingGrid[startNode.row][startNode.col];
    const endNodeObj = workingGrid[endNode.row][endNode.col];

    // Initialize
    startNodeObj.distance = 0;
    const unvisitedNodes = getAllNodesFromGrid(workingGrid);
    const visitedNodesInOrder = [];

    // Calculate delay based on speed
    const delay = Math.max(20, 300 - (speed * 3)); // 20ms to 297ms delay

    const processNextNode = () => {
      if (unvisitedNodes.length === 0) {
        // Algorithm complete, animate shortest path
        setTimeout(() => {
          animateShortestPath(workingGrid);
          setIsRunning(false);
        }, delay);
        return;
      }

      sortNodesByDistance(unvisitedNodes);
      const closestNode = unvisitedNodes.shift();

      // Skip walls
      if (closestNode.isWall) {
        setTimeout(processNextNode, 10); // Quick skip for walls
        return;
      }

      // If we hit a node with infinite distance, we're trapped
      if (closestNode.distance === Infinity) {
        setTimeout(() => {
          animateShortestPath(workingGrid);
          setIsRunning(false);
        }, delay);
        return;
      }

      // Mark as visited
      closestNode.isVisited = true;
      visitedNodesInOrder.push(closestNode);

      // Update the visual grid immediately
      setGrid(prevGrid => {
        const newGrid = prevGrid.map(row => [...row]);
        newGrid[closestNode.row][closestNode.col] = {
          ...newGrid[closestNode.row][closestNode.col],
          isVisited: true
        };
        return newGrid;
      });

      // If we reached the end, stop
      if (closestNode === endNodeObj) {
        setTimeout(() => {
          animateShortestPath(workingGrid);
          setIsRunning(false);
        }, delay);
        return;
      }

      // Update neighbors
      updateUnvisitedNeighbors(closestNode, workingGrid);

      // Schedule next node
      setTimeout(processNextNode, delay);
    };

    // Start the process
    processNextNode();
  };

  const getAllNodesFromGrid = (gridToUse) => {
    const nodes = [];
    for (const row of gridToUse) {
      for (const node of row) {
        nodes.push(node);
      }
    }
    return nodes;
  };

  const sortNodesByDistance = (unvisitedNodes) => {
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
  };

  const updateUnvisitedNeighbors = (node, gridToUse) => {
    const unvisitedNeighbors = getUnvisitedNeighbors(node, gridToUse);
    for (const neighbor of unvisitedNeighbors) {
      neighbor.distance = node.distance + 1;
      neighbor.previousNode = node;
    }
  };

  const getUnvisitedNeighbors = (node, gridToUse) => {
    const neighbors = [];
    const { col, row } = node;

    if (row > 0) neighbors.push(gridToUse[row - 1][col]);
    if (row < gridToUse.length - 1) neighbors.push(gridToUse[row + 1][col]);
    if (col > 0) neighbors.push(gridToUse[row][col - 1]);
    if (col < gridToUse[0].length - 1) neighbors.push(gridToUse[row][col + 1]);

    return neighbors.filter(neighbor => !neighbor.isVisited);
  };



  const animateShortestPath = (finalGrid) => {
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finalGrid);
    const pathDelay = Math.max(50, 150 - speed); // 50ms to 149ms delay for path

    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        setGrid(prevGrid => {
          const newGrid = prevGrid.map(row => [...row]);
          newGrid[node.row][node.col] = { ...newGrid[node.row][node.col], isPath: true };
          return newGrid;
        });
      }, pathDelay * i);
    }
  };

  const getNodesInShortestPathOrder = (finalGrid) => {
    const nodesInShortestPathOrder = [];
    let currentNode = finalGrid[endNode.row][endNode.col];

    while (currentNode !== null) {
      nodesInShortestPathOrder.unshift(currentNode);
      currentNode = currentNode.previousNode;
    }

    return nodesInShortestPathOrder;
  };

  const getNodeClassName = (node) => {
    let className = 'modern-node';

    if (node.isStart) className += ' start';
    else if (node.isEnd) className += ' finish';
    else if (node.isWall) className += ' wall';
    else if (node.isPath) className += ' path';
    else if (node.isVisited) className += ' visited';

    return className;
  };

  return (
    <div className="visualizer-page">
      <div className="visualizer-container">
        {/* Control Panel */}
        <div className="control-panel glass-card">
          <div className="control-section">
            <h3>Algorithm</h3>
            <div className="algorithm-display">
              <span className="algorithm-name">Dijkstra's Algorithm</span>
              <p className="algorithm-info">Guaranteed shortest path finder</p>
            </div>
          </div>

          <div className="control-section">
            <h3>Speed</h3>
            <input
              type="range"
              min="1"
              max="100"
              value={speed}
              onChange={(e) => setSpeed(parseInt(e.target.value))}
              disabled={isRunning}
            />
            <span>{speed}%</span>
          </div>

          <div className="control-section">
            <h3>Set Nodes</h3>
            <div className="node-controls">
              <button
                className={`modern-btn ${isSettingStart ? 'accent' : 'secondary'}`}
                onClick={() => {
                  setIsSettingStart(!isSettingStart);
                  setIsSettingEnd(false);
                }}
                disabled={isRunning}
              >
                {isSettingStart ? 'Click Grid to Set Start' : 'Set Start Node'}
              </button>

              <button
                className={`modern-btn ${isSettingEnd ? 'accent' : 'secondary'}`}
                onClick={() => {
                  setIsSettingEnd(!isSettingEnd);
                  setIsSettingStart(false);
                }}
                disabled={isRunning}
              >
                {isSettingEnd ? 'Click Grid to Set End' : 'Set End Node'}
              </button>
            </div>
          </div>

          <div className="control-actions">
            <button
              className="modern-btn primary"
              onClick={visualizeDijkstra}
              disabled={isRunning}
            >
              {isRunning ? 'Running...' : 'Visualize Dijkstra'}
            </button>

            <button
              className="modern-btn secondary"
              onClick={clearGrid}
              disabled={isRunning}
            >
              Clear Path
            </button>

            <button
              className="modern-btn secondary"
              onClick={clearWalls}
              disabled={isRunning}
            >
              Clear Walls
            </button>
          </div>
        </div>

        {/* Grid */}
        <div className="grid-container glass-card">
          <div className="grid">
            {grid.map((row, rowIdx) => (
              <div key={rowIdx} className="grid-row">
                {row.map((node, nodeIdx) => (
                  <div
                    key={nodeIdx}
                    className={getNodeClassName(node)}
                    onMouseDown={() => handleMouseDown(node.row, node.col)}
                    onMouseEnter={() => handleMouseEnter(node.row, node.col)}
                    onMouseUp={handleMouseUp}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="legend glass-card">
          <h3>Legend</h3>
          <div className="legend-items">
            <div className="legend-item">
              <div className="modern-node start"></div>
              <span>Start Node</span>
            </div>
            <div className="legend-item">
              <div className="modern-node finish"></div>
              <span>End Node</span>
            </div>
            <div className="legend-item">
              <div className="modern-node wall"></div>
              <span>Wall</span>
            </div>
            <div className="legend-item">
              <div className="modern-node visited"></div>
              <span>Visited</span>
            </div>
            <div className="legend-item">
              <div className="modern-node path"></div>
              <span>Shortest Path</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisualizerPage;
