function form_ingresar_venta(){

  var Ingresar_venta = React.createClass({
    /* Se lanza antes de que se renderice el componente */
    componentWillMount:function() {},
    getInitialState: function() {
      return { customerList: 'cargando ...' };
    },
    /* Se lanza despues de renderizado el componente */
    componentDidMount:function(){},
    render:function(){
      return(<div>

        <div id="btnIngresar_venta" onClick={this.hand_Save} >Ingresar venta!</div>
        <br/>

      </div>);
    },

    /* eventos */
    hand_Save:function(){
      require(['js/new/venta/componentes/ingresar_venta']).then(imports => {
        console.log('imports', imports);
        var ingresar_venta = imports[0];
        ingresar_venta.save();
      }).catch(console.log);
    }
  });
  React.render(<Ingresar_venta/>,document.getElementById('frame'));

}
