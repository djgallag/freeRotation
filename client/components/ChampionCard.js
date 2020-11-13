import React from "react";

export const ChampionCard = ({ champion }) => {
    const tags = champion.tags.join(', ')
    return (
        <div className={"championCard"}>
            <div className={`championImg_${champion.id}`}>
                <img src={champion.imageUrl} />
            </div>
            <div className="championInfo">
                <h3>{champion.name},</h3>
                <p className="title">{champion.title}</p>
                <p>Tags: {tags}</p>
            </div>
        </div>
    )
};
