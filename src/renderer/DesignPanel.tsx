import React from 'react';
import './DesignPanel.scss';

interface IPoint {
  X: number;
  Y: number;
}

interface IPosition {
  top: string;
  left: string;
}

interface IDesignPanelProps {
  panelWidth: number;
  panelHeight: number;
}

interface IDesignPanelState {
  lastMousePoint: IPoint;
  currentDraggablePosition: IPosition;
  draggingElement: HTMLElement | null;
}
class DesignPanel extends React.Component<
  IDesignPanelProps,
  IDesignPanelState
> {
  constructor(props: IDesignPanelProps) {
    super(props);
    this.state = {
      lastMousePoint: {
        X: 0,
        Y: 0
      },
      currentDraggablePosition: {
        top: '0',
        left: '0'
      },
      draggingElement: null
    };

    this.handleDraggableMouseDown = this.handleDraggableMouseDown.bind(this);
    this.handleDraggableMouseMove = this.handleDraggableMouseMove.bind(this);
    this.handleDraggableMouseUp = this.handleDraggableMouseUp.bind(this);

    document.documentElement.addEventListener(
      'mouseup',
      this.handleDraggableMouseUp,
      false
    );
    document.documentElement.addEventListener(
      'mousemove',
      this.handleDraggableMouseMove,
      false
    );
  }

  render() {
    return (
      <div>
        <div
          className="design-panel"
          style={{
            width: this.props.panelWidth + 'px',
            height: this.props.panelHeight + 'px'
          }}
        >
          <div
            className="design-panel__block"
            onMouseDown={this.handleDraggableMouseDown}
            style={{
              left: this.state.currentDraggablePosition.left,
              top: this.state.currentDraggablePosition.top
            }}
          >
            drag me!
          </div>
        </div>
      </div>
    );
  }

  private handleDraggableMouseDown(e: React.MouseEvent<HTMLElement>) {
    this.setState({
      lastMousePoint: {
        X: e.clientX,
        Y: e.clientY
      },
      draggingElement: e.target as HTMLElement
    });
  }

  private handleDraggableMouseMove(e: MouseEvent) {
    const visibleRect = {
      width: this.props.panelWidth,
      height: this.props.panelHeight
    };
    const newMousePoint = {
      X: e.clientX,
      Y: e.clientY
    };
    if (
      this.state.draggingElement &&
      this.inRange(newMousePoint.X, 0, visibleRect.width) &&
      this.inRange(newMousePoint.Y, 0, visibleRect.height)
    ) {
      const draggableRect = this.state.draggingElement.getBoundingClientRect();
      const rightLimit = visibleRect.width - draggableRect.width;
      const bottomLimit = visibleRect.height - draggableRect.height;

      // tslint:disable-next-line:no-console
      console.log(rightLimit, visibleRect.width, draggableRect.width);

      const lastMousePoint = this.state.lastMousePoint;
      const lastPosition = this.state.currentDraggablePosition;
      const offsetX = newMousePoint.X - lastMousePoint.X;
      const offsetY = newMousePoint.Y - lastMousePoint.Y;
      const newDraggablePoint = {
        X: parseInt(lastPosition.left, 10) + offsetX,
        Y: parseInt(lastPosition.top, 10) + offsetY
      };
      newDraggablePoint.X = this.clamp(newDraggablePoint.X, 0, rightLimit);
      newDraggablePoint.Y = this.clamp(newDraggablePoint.Y, 0, bottomLimit);
      const newDraggablePosition = {
        left: newDraggablePoint.X + 'px',
        top: newDraggablePoint.Y + 'px'
      };
      this.setState({
        lastMousePoint: newMousePoint,
        currentDraggablePosition: newDraggablePosition
      });
    }
  }

  private handleDraggableMouseUp(e: MouseEvent) {
    this.setState({
      lastMousePoint: {
        X: 0,
        Y: 0
      },
      draggingElement: null
    });
  }

  private clamp(num: number, leftLimit: number, rightLimit: number) {
    if (num < leftLimit) {
      return leftLimit;
    } else if (num > rightLimit) {
      return rightLimit;
    } else {
      return num;
    }
  }

  private inRange(num: number, leftLimit: number, rightLimit: number) {
    if (num >= leftLimit && num <= rightLimit) {
      return true;
    } else {
      return false;
    }
  }
}

export default DesignPanel;
