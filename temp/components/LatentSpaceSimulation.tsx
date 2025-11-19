import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { DataPoint } from '../types';
import { ArrowRight, RefreshCw } from 'lucide-react';

interface Props {
  data: DataPoint[];
}

const LatentSpaceSimulation: React.FC<Props> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [isOptimized, setIsOptimized] = useState(false);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 500;
    const height = 300;
    const margin = { top: 20, right: 20, bottom: 20, left: 20 };

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear previous

    // Scales
    const xScale = d3.scaleLinear().domain([-20, 120]).range([margin.left, width - margin.right]);
    const yScale = d3.scaleLinear().domain([-20, 120]).range([height - margin.bottom, margin.top]);
    
    // Color scale (Purple for high yield, Orange for low)
    const colorScale = d3.scaleSequential(d3.interpolatePlasma).domain([0, 100]);

    // Grid lines (for effect)
    const grid = svg.append("g").attr("class", "grid-lines").attr("opacity", 0.1);
    
    // Draw grid
    for (let i = 0; i <= 10; i++) {
        grid.append("line")
            .attr("x1", xScale(-20)).attr("y1", yScale(i * 14 - 20))
            .attr("x2", xScale(120)).attr("y2", yScale(i * 14 - 20))
            .attr("stroke", "currentColor");
        grid.append("line")
            .attr("x1", xScale(i * 14 - 20)).attr("y1", yScale(-20))
            .attr("x2", xScale(i * 14 - 20)).attr("y2", yScale(120))
            .attr("stroke", "currentColor");
    }

    // Nodes
    const nodes = svg.append("g")
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("r", 6)
      .attr("cx", d => xScale(d.initialX))
      .attr("cy", d => yScale(d.initialY))
      .attr("fill", d => colorScale(d.yield))
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5)
      .attr("opacity", 0.8)
      .style("cursor", "pointer");

    // Transition function
    const updatePositions = () => {
      nodes.transition()
        .duration(1500)
        .ease(d3.easeCubicInOut)
        .attr("cx", d => xScale(isOptimized ? d.optimizedX : d.initialX))
        .attr("cy", d => yScale(isOptimized ? d.optimizedY : d.initialY));
    };

    updatePositions();

    // Add simple tooltip interaction
    nodes.on("mouseover", function() {
        d3.select(this).transition().duration(200).attr("r", 10);
    }).on("mouseout", function() {
        d3.select(this).transition().duration(200).attr("r", 6);
    });

  }, [data, isOptimized]);

  return (
    <div className="flex flex-col items-center bg-white p-6 rounded-xl shadow-sm border border-slate-200">
      <div className="flex justify-between w-full mb-4 items-center">
        <div>
            <h3 className="font-bold text-slate-800">Latent Space Visualization</h3>
            <p className="text-xs text-slate-500">
                {isOptimized 
                    ? "Structured: Clustered by performance (High yield top-right)" 
                    : "Unstructured: Random distribution (Hard for GP to model)"}
            </p>
        </div>
        <div className="flex gap-2">
             <button 
                onClick={() => setIsOptimized(!isOptimized)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                    isOptimized 
                    ? 'bg-slate-100 text-slate-600 hover:bg-slate-200' 
                    : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md'
                }`}
            >
                {isOptimized ? <><RefreshCw size={16}/> Reset</> : <><ArrowRight size={16}/> Fine-tune LLM</>}
            </button>
        </div>
      </div>
      
      <div className="relative w-full max-w-[500px] aspect-[5/3] bg-slate-50 rounded-lg overflow-hidden border border-slate-100">
        <svg ref={svgRef} viewBox="0 0 500 300" className="w-full h-full"></svg>
        
        {/* Legend */}
        <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur p-2 rounded text-xs border border-slate-200 flex flex-col gap-1 shadow-sm">
            <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-purple-600"></div>
                <span>High Yield</span>
            </div>
            <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-orange-400"></div>
                <span>Low Yield</span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default LatentSpaceSimulation;