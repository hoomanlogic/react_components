/* 
 * ContentEditable
 */
var ContentEditable = React.createClass({
    render: function () {
        return <div 
            style={{display: 'inline'}}
            onInput={this.emitChange} 
            onBlur={this.emitChange}
            contentEditable
            dangerouslySetInnerHTML={{__html: this.props.html}}></div>;    
    },
    shouldComponentUpdate: function(nextProps){
        //return nextProps.html !== this.getDOMNode().innerHTML;
        return nextProps.html !== this.props.html;
    },
    emitChange: function () {
        var html = this.getDOMNode().innerHTML;
        if (this.props.onChange && html !== this.lastHtml) {
            this.props.onChange({
                target: {
                    id: this.props.id || null,
                    value: html
                }
            });
        }
        this.lastHtml = html;    
    }
});