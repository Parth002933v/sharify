// src/hocs/withBorder.tsx
import React, { ComponentType } from "react";

type withEditorMenusProps = {
  // Additional props specific to HOC can be defined here
};

const withEditorMenus = <P extends object>(
  WrappedComponent: ComponentType<P>,
) => {
  const ComponentWithEditorMenues = (props: P & withEditorMenusProps) => (
    <div style={{ border: "2px solid blue", padding: "10px" }}>
      <WrappedComponent {...props} />
    </div>
  );

  return ComponentWithEditorMenues;
};

export default withEditorMenus;
