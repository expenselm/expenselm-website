import React from 'react';

interface SectionTitleProps {
    children: React.ReactElement;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ children }) => {
    const existingClassName = children.props.className ?? "";
    const mergedClassName = `${existingClassName} text-3xl lg:text-5xl lg:leading-tight font-bold`.trim();

    return React.cloneElement(children, {
        className: mergedClassName
    });
};

export default SectionTitle;
