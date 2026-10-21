import { Component, type ReactNode } from "react";

type SceneErrorBoundaryProps = {
  children: ReactNode;
  onError: () => void;
};

type SceneErrorBoundaryState = {
  failed: boolean;
};

export default class SceneErrorBoundary extends Component<
  SceneErrorBoundaryProps,
  SceneErrorBoundaryState
> {
  state: SceneErrorBoundaryState = { failed: false };

  static getDerivedStateFromError(): SceneErrorBoundaryState {
    return { failed: true };
  }

  componentDidCatch(error: Error) {
    console.error(error);
    this.props.onError();
  }

  render() {
    if (this.state.failed) return null;
    return this.props.children;
  }
}
