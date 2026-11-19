import { useEffect, useMemo, useState } from 'react';
import {
  Background,
  Controls,
  type Edge,
  MarkerType,
  type Node,
  ReactFlow,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Play, RotateCcw, SkipForward } from 'lucide-react';
import type { StoryEdgeData, StoryNodeData } from '../data/stories';
import { useTheme } from './ThemeContext';

interface ArchitectureDiagramProps {
  title: string;
  label: string;
  nodesData: StoryNodeData[];
  edgesData: StoryEdgeData[];
}

export function ArchitectureDiagram({
  title,
  label,
  nodesData,
  edgesData,
}: ArchitectureDiagramProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [activeEdgeIdx, setActiveEdgeIdx] = useState<number>(-1);
  const [autoPlay, setAutoPlay] = useState(false);

  useEffect(() => {
    setActiveEdgeIdx(-1);
    setAutoPlay(false);
  }, [title]);

  useEffect(() => {
    if (!autoPlay) return;
    const timer = window.setInterval(() => {
      setActiveEdgeIdx((prev) => {
        if (prev >= edgesData.length - 1) {
          setAutoPlay(false);
          return prev;
        }
        return prev + 1;
      });
    }, 1150);
    return () => window.clearInterval(timer);
  }, [autoPlay, edgesData.length]);

  const activeEdge = activeEdgeIdx >= 0 ? edgesData[activeEdgeIdx] : null;

  const nodes: Node[] = useMemo(
    () =>
      nodesData.map((n) => {
        const isHighlighted =
          activeEdge && (activeEdge.source === n.id || activeEdge.target === n.id);
        const accentMap = {
          primary: isDark ? 'rgba(69,109,255,0.45)' : 'rgba(52,88,235,0.4)',
          secondary: isDark ? 'rgba(139,92,246,0.45)' : 'rgba(124,58,237,0.4)',
          success: isDark ? 'rgba(53,197,138,0.45)' : 'rgba(24,156,104,0.4)',
          neutral: isDark ? 'rgba(255,255,255,0.14)' : 'rgba(17,19,24,0.14)',
        };
        const borderColor = isHighlighted
          ? isDark
            ? '#35C58A'
            : '#189C68'
          : accentMap[n.tone ?? 'neutral'];

        return {
          id: n.id,
          position: { x: n.x, y: n.y },
          data: {
            label: (
              <div className="px-1 py-0.5 text-left">
                <div className="font-display text-xs font-semibold leading-tight text-[#111318] dark:text-[#F5F5F5]">
                  {n.label}
                </div>
                {n.sublabel && (
                  <div className="mt-1 font-mono text-[10px] text-[#4E5565] dark:text-[#A0A5B1]">
                    {n.sublabel}
                  </div>
                )}
              </div>
            ),
          },
          style: {
            background: isDark ? '#20232B' : '#FFFFFF',
            border: `${isHighlighted ? '2px' : '1px'} solid ${borderColor}`,
            borderRadius: '10px',
            padding: '10px 14px',
            minWidth: 168,
            boxShadow: isHighlighted
              ? '0 0 0 4px rgba(53,197,138,0.14)'
              : isDark
                ? '0 4px 16px rgba(0, 0, 0, 0.25)'
                : '0 4px 14px rgba(17, 19, 24, 0.06)',
            transition: 'all 180ms ease',
          },
        };
      }),
    [nodesData, isDark, activeEdge],
  );

  const edges: Edge[] = useMemo(
    () =>
      edgesData.map((e, idx) => {
        const isCurrent = idx === activeEdgeIdx;
        return {
          id: e.id,
          source: e.source,
          target: e.target,
          label: e.label,
          animated: isCurrent || (activeEdgeIdx === -1 && Boolean(e.animated)),
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: isCurrent
              ? isDark
                ? '#35C58A'
                : '#189C68'
              : isDark
                ? '#456DFF'
                : '#3458EB',
          },
          style: {
            stroke: isCurrent
              ? isDark
                ? '#35C58A'
                : '#189C68'
              : isDark
                ? '#456DFF'
                : '#3458EB',
            strokeWidth: isCurrent ? 2.5 : 1.5,
            opacity: activeEdgeIdx >= 0 && !isCurrent ? 0.35 : 1,
          },
          labelStyle: {
            fill: isCurrent
              ? isDark
                ? '#F5F5F5'
                : '#111318'
              : isDark
                ? '#A0A5B1'
                : '#4E5565',
            fontSize: 10,
            fontFamily: 'JetBrains Mono, monospace',
          },
          labelBgStyle: {
            fill: isDark ? '#101114' : '#F7F8FA',
            fillOpacity: 0.92,
          },
        };
      }),
    [edgesData, isDark, activeEdgeIdx],
  );

  const handleStep = () => {
    setAutoPlay(false);
    setActiveEdgeIdx((prev) => (prev + 1 >= edgesData.length ? 0 : prev + 1));
  };

  const handlePlay = () => {
    setActiveEdgeIdx(0);
    setAutoPlay(true);
  };

  const handleReset = () => {
    setAutoPlay(false);
    setActiveEdgeIdx(-1);
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-black/10 dark:border-white/10 bg-[#ECEEF3]/70 dark:bg-[#191C24]">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-black/8 dark:border-white/8 px-5 py-3.5">
        <div>
          <h3 className="font-display text-sm font-semibold text-[#111318] dark:text-[#F5F5F5]">
            {title}
          </h3>
          <span className="font-mono text-[11px] text-[#4E5565] dark:text-[#A0A5B1]">
            {label}
          </span>
        </div>

        {/* Interactive Request Flow Controls */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handlePlay}
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#3458EB] dark:bg-[#456DFF] px-3 py-1.5 text-xs font-medium text-white hover:bg-[#2746CE] dark:hover:bg-[#375CE6] whitespace-nowrap shrink-0"
          >
            <Play className="w-3 h-3" aria-hidden="true" />
            <span>Trace Flow</span>
          </button>
          <button
            type="button"
            onClick={handleStep}
            className="inline-flex items-center gap-1.5 rounded-lg border border-black/12 dark:border-white/12 bg-white dark:bg-[#20232B] px-3 py-1.5 text-xs font-medium text-[#111318] dark:text-[#F5F5F5] whitespace-nowrap shrink-0"
          >
            <SkipForward className="w-3 h-3" aria-hidden="true" />
            <span>Step</span>
          </button>
          {activeEdgeIdx >= 0 && (
            <button
              type="button"
              onClick={handleReset}
              aria-label="Reset trace"
              className="inline-flex items-center justify-center rounded-lg border border-black/12 dark:border-white/12 bg-white dark:bg-[#20232B] p-1.5 text-[#4E5565] dark:text-[#A0A5B1] hover:text-[#111318] dark:hover:text-white"
            >
              <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>

      {/* Active Trace Caption */}
      {activeEdge && (
        <div className="border-b border-black/8 dark:border-white/8 bg-[#35C58A]/10 px-5 py-2 font-mono text-xs text-[#111318] dark:text-[#F5F5F5] tabular-nums">
          Step {activeEdgeIdx + 1} of {edgesData.length}:{' '}
          <span className="text-[#189C68] dark:text-[#35C58A]">
            {nodesData.find((n) => n.id === activeEdge.source)?.label} →{' '}
            {nodesData.find((n) => n.id === activeEdge.target)?.label}
          </span>
          {activeEdge.label ? ` (${activeEdge.label})` : ''}
        </div>
      )}

      <div className="h-[340px] w-full">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          fitView
          fitViewOptions={{ padding: 0.2 }}
          proOptions={{ hideAttribution: true }}
          nodesConnectable={false}
          elementsSelectable={true}
        >
          <Background
            gap={24}
            size={1}
            color={isDark ? 'rgba(255,255,255,0.06)' : 'rgba(17,19,24,0.07)'}
          />
          <Controls showInteractive={false} />
        </ReactFlow>
      </div>
    </div>
  );
}
