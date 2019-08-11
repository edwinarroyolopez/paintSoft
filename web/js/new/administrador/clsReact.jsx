


function producto(){
  var Producto = React.createClass({
                      getInitialState: function(){
                          return{

                          };
                      },
                      render:function(){
                          // var image = this.state.avatar;
                          return(
                                  <div>Producto jsx</div>
                              );

                      }
                  });
                  React.render(<Producto/>,document.getElementById('center'));
}

function cliente(){
            var Cliente = React.createClass({
                                getInitialState: function(){
                                    return{

                                    };
                                },
                                render:function(){
                                    // var image = this.state.avatar;
                                    return(
                                            <div>Cliente jsx</div>
                                        );

                                }
                            });
                            React.render(<Cliente/>,document.getElementById('center'));



}

function factura(){

          var Facturas = React.createClass({
                              getInitialState: function(){
                                  return{

                                  };
                              },
                              render:function(){
                                  // var image = this.state.avatar;
                                  return(
                                          <div>Factuas jsx</div>
                                      );

                              }
                          });
                          React.render(<Facturas/>,document.getElementById('center'));
}
