var Modal = React.createClass({
    getBuffer: function () {
        var buffer = $( ".modal-dialog").offset().top * 2;
        buffer += $( ".modal-header").innerHeight();
        buffer += $( ".modal-footer").innerHeight();
        return buffer;
    },
    getDefaultProps: function () { 
        return {
            backdrop: true, 
            buttons: [],
            keyboard: true, 
            show: true, 
            remote: ''
        }
    },
    render: function () {
        var buttons = this.props.buttons.map(function(button, index) {
            return <button key={index} type="button" className={'btn btn-' + button.type} onClick={button.handler}>{button.text}</button>
        })
        
        return (
            <div className="modal fade">
                <div className="modal-dialog">
                    <div className="modal-content">  
                        <div className="modal-header">
                            {this.renderCloseButton()}<strong>{this.props.header}</strong>  
                        </div>  
                        <div className="modal-body scroll" style={{ height: ($( window ).innerHeight() - 174) + 'px', overflowY: "scroll" }}>
                            {this.props.children}  
                        </div>  
                        <div className="modal-footer">
                            {buttons}  
                        </div>
                    </div>
                </div>
            </div>
        );
    },
    renderCloseButton: function () {
        return <button type="button" className="close" onClick={this.hide} dangerouslySetInnerHTML={{__html: '&times'}} />
    },
    hide: function () {
        var domThis = $(this.getDOMNode());
        domThis.removeClass('in');
      
        window.setTimeout(function() {
            domThis.css('display', 'none');
        }.bind(this), 150);
        
        // unbind modal resize from window resize
        $( window ).unbind('resize', this.resizeModal);
    },
    show: function () {
        var domThis = $(this.getDOMNode());
        domThis.css('display', 'block');
        
        // ensure display: block is truly set before
        // adding the 'in' or else the animation does
        // not occur
        window.setTimeout(function() {
            domThis.addClass('in');
        }.bind(this), 1);
        
        // bind modal resize with window resize
        $( window ).bind('resize', this.resizeModal);
    },
    resizeModal: function () {
        $( ".modal-body" ).css('height', ($( window ).innerHeight() - this.getBuffer()) + 'px');
    }
});