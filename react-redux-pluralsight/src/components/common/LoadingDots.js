import React, { PropTypes, Component } from 'react';

class LoadingDots extends Component {
    constructor(props) {
        super(props);

        this.state = { frame: 1 };
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            this.setState({
                frame: this.state.frame + 1
            });
        }, this.props.interval);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        let dots = this.state.frame % (this.props.dots + 1);
        let text = '';
        while (dots > 0) {
            text += '.';
            dots--;
        }

        return <span {...this.prop}>{text}&nbsp;</span>;
    }
}

LoadingDots.defaultProps = {
    interval: 300,
    dots: 3
};

LoadingDots.propTypes = {
    interval: PropTypes.number,
    dots: PropTypes.number
};

export default LoadingDots;