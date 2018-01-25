# Empty Chair Mock
El nombre del proyecto no es descriptivo y tampoco me interesa que los sea.

## Uso

este widget funciona insertando el siguiente código en algún lugar de la página:

```html
          <div>
            <link rel="stylesheet" href="http://cdn.jsdelivr.net/bootstrap/3.3.5/css/bootstrap.css">
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
            <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
            <script type="text/javascript">

                $( document ).ready(function() {
                    $('.modal').on('show.bs.modal',function(){      
                      $(this).find('iframe').attr('src','https://divisiondeariza.github.io/empty-chair-widgets/#!/');                      
                       // $(this).find('iframe').attr('src','http://localhost:9000/#!/');
                    });
                  });
            </script>
            <style type="text/css">
              .modal-content {
                background-color: #000;
                color: #fff;
              }

              .modal-lg{
                 max-width: none;
                 width: 80%;
              }

              .wj-close-modal{
                    color: #fff; 
                    opacity: 1;
                    padding-top: 0px!important;
                    padding-bottom: 0px!important;
                    font-size: 30px;

              }

              .wj-close-modal:hover {
                color: #eee; 
              }

            </style>

            <!-- Trigger the modal with a button -->

            <div>
              <a data-toggle="modal" data-target="#myModal" style="position: absolute; width:300px; height:310px"></a>
              <iframe class="embed-responsive-item" frameborder="0" src="https://divisiondeariza.github.io/empty-chair-widgets/#!/actionbtn" width="300" height="310" scrolling="no" ></iframe>
            </div>


            <!-- Modal -->

            <div class="modal fade" id="myModal" role="dialog">

              <div class="modal-dialog modal-lg">
              
                <div class="modal-content">
                  <div class="modal-header">
                    <h4 class="modal-title">Modal Header</h4>
                    <button type="button" class="close wj-close-modal" data-dismiss="modal">&times;</button>
                  </div>
                  <div class="modal-body">
                    <div class="embed-responsive embed-responsive-4by3"> 
                      <iframe class="embed-responsive-item" frameborder="0" src="" width="800"  height="768"></iframe>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                  </div>
                </div>
                
              </div>

            </div>
            
          </div>
```


Para insertar el código en Drupal 7 se puede usar el módulo [Widgets](https://www.drupal.org/project/widgets),que permite crear widgets personalizados a partir de código HTML 
