/* 
 * ContentEditable
 */
var ContentEditable = React.createClass({
	mixins: [React.addons.PureRenderMixin],
	
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
    },
	
    render: function () {
        return <div 
            style={Object.assign({display: 'inline'}, this.props.style)}
            onInput={this.emitChange} 
            onBlur={this.emitChange}
            contentEditable
            dangerouslySetInnerHTML={{__html: this.props.html}}></div>;    
    }
});