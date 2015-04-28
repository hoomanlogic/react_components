/* 
 * DataTable
 * ClassNames: text-[left,right,center] table table-striped fa fa-sort-asc fa-sort-desc
 * Dependencies: jQuery, Bootstrap(CSS), FontAwesome
 */
var DataTable = React.createClass({
    getInitialState: function () {
        return { 
            sortBy: (this.props.sortBy || this.props.columnDefinitions[0].field), 
            sortAsc: (this.props.sortAsc !== void 0 ? this.props.sortAsc : true)
        };
    },
    getDefaultProps: function () {
        return {
            maxColWidth: '30vw'  
        };
    },
    componentDidUpdate: function () {
        $('[data-toggle="tooltip"]').tooltip();
    },
    render: function () {
        // states
        var sortBy = this.state.sortBy;
        var sortAsc = this.state.sortAsc;
        
        // props
        var colDefs = this.props.columnDefinitions;
        var data = _.sortBy(this.props.data, function(item){ return item[sortBy]; });
        if (sortAsc !== true) {
            data.reverse();
        }
        
        // minimum data requirement
        if (!colDefs) {
            return null;   
        }
        
        var domHeadColumns = [], domRows = [], i, j;
        
        // define columns
        for (i = 0; i < colDefs.length; i++) {
        
            var domHeadColumn = (
                <th className={'text-' + (colDefs[i].justify || 'left')}>
                    <a href="javascript:;" onClick={this.sort.bind(null, colDefs[i].field)}>
                        {colDefs[i].display} <i className={sortBy === colDefs[i].field ? (sortAsc ? 'fa fa-sort-asc' : 'fa fa-sort-desc') : ''}></i>
                    </a>
                </th>
            );
            domHeadColumns.push(domHeadColumn);
        };
    
        if (data) {
            // define rows
            for (j = 0; j < data.length; j++) {
                var domBodyColumns = [];

                for (i = 0; i < colDefs.length; i++) {

                    var cellContent = null;
                    var text = data[j][colDefs[i].field];
                    if (colDefs[i].limitLength) {
                        if (text.length > colDefs[i].limitLength) {
                            text = text.slice(0,colDefs[i].limitLength);
                        }
                    }
                    if (colDefs[i].onRender) {
                        cellContent = colDefs[i].onRender(data[j], colDefs[i].field, j);
                    } else if (colDefs[i].onCellClick) {
                        cellContent = (
                            <a href="javascript:;" onClick={colDefs[i].onCellClick.bind(null, colDefs[i].field, data[j])}>
                                <span data-toggle="tooltip" data-placement="bottom" title={data[j][colDefs[i].field]}>{text}</span>
                            </a>
                        );
                    } else {
                        cellContent = (
                            <span data-toggle="tooltip" data-placement="bottom" title={data[j][colDefs[i].field]}>{text}</span>
                        );
                    }
                    
                    // old: overflowWrap: 'break-word'

                    var domBodyColumn = (
                        <td onClick={this.handleCellContentClick.bind(null, colDefs[i])} className={'text-summary text-' + (colDefs[i].justify || 'left')} style={{ maxWidth: (colDefs[i].maxWidth || this.props.maxColWidth) }}>
                            {cellContent}
                        </td>
                    );

                    domBodyColumns.push(domBodyColumn);
                };

                var domRow = (
                    <tr>
                        {domBodyColumns}
                    </tr>
                );
                domRows.push(domRow);
            }; 
        }

        return (
            <table className="table table-striped">
                <thead>
                    <tr>
                        {domHeadColumns}
                    </tr>
                </thead>
                <tbody>
                    {domRows}
                </tbody>
            </table>
        );
    },
    handleCellContentClick: function (colDef, e) {
        // get the parent td element
        var node = e.target;
        while (String(node) !== '[object HTMLTableCellElement]' && node.parentNode) {
            node = node.parentNode;
        }
        if (String(node) !== '[object HTMLTableCellElement]') {
            return;
        }
        
        var classNames = node.className.split(' ');
        var index = classNames.indexOf('text-summary');
        
        if (index > -1) {
            classNames.splice(index, 1);
        } else {
            classNames.push('text-summary');
        }
        node.className = classNames.join(' ');
    },
    sort: function (field) {
        var sortBy = this.state.sortBy;
        var sortAsc = this.state.sortAsc;
        if (field === sortBy) {
            sortAsc = !sortAsc;
        } else {
            sortBy = field;
            sortAsc = true;
        }
        
        this.setState({ sortBy: sortBy, sortAsc: sortAsc });
    }
});