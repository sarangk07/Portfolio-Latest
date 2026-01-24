'use client';

import React from 'react';

const SkillBar = ({
    name,
    level, // 0-100
    showPercent = false,
    className = '',
}) => {
    return (
        <div className={`space-y-2 ${className}`}>
            <div className="flex items-center justify-between">
                <span className="font-pixel text-sm text-pixel-text tracking-wide">{name}</span>
                {showPercent && (
                    <span className="font-pixel-mono text-xs text-pixel-text-secondary">{level}%</span>
                )}
            </div>

            <div className="relative h-5 bg-pixel-dark border-2 border-pixel-elevated overflow-hidden">
                {/* Fill bar */}
                <div
                    className="h-full bg-gradient-to-r from-pixel-text-muted to-pixel-text-secondary transition-all duration-1000 ease-out"
                    style={{ width: `${level}%` }}
                >
                    {/* Shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/20" />

                    {/* Pixel segments overlay */}
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage: `repeating-linear-gradient(
                90deg,
                transparent,
                transparent 18px,
                rgba(0,0,0,0.2) 18px,
                rgba(0,0,0,0.2) 20px
              )`,
                        }}
                    />
                </div>

                {/* Empty segments (shows depth) */}
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `repeating-linear-gradient(
              90deg,
              transparent,
              transparent 18px,
              rgba(255,255,255,0.03) 18px,
              rgba(255,255,255,0.03) 20px
            )`,
                    }}
                />
            </div>
        </div>
    );
};

export default SkillBar;
