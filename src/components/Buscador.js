
import {useEffect, useState, useRef} from 'react';
import ModalB from './ModalB';
import YoutubeGetID from './YoutubeGetID';
import { Modal } from 'bootstrap';




function Buscador() {

  const [usuarios, setUsuarios]= useState([]);
  const [tablaUsuarios, setTablaUsuarios]= useState([]);
  const [post, setPost] = useState();
  const [post2, setPost2] = useState([]);
  const [busqueda, setBusqueda]= useState("");
  const [info, setInfo] = useState(null);
const [modal, setModal] = useState(null)
const exampleModal = useRef();
 

const peticionGet=()=>{

    fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => response.json())
    .then((data) => {
        setUsuarios(data);
        setTablaUsuarios(data);
    });


}

const handleChange = (e) =>{
    setBusqueda(e.target.value);
    busquedaVideos(e.target.value);
    console.log(e.target.value)

}


const busquedaVideos = async (terminoBusqueda) => {

    await fetch(`https://www.googleapis.com/blogger/v3/blogs/4209688436429267338/posts/search?q='${terminoBusqueda}&labels=hip+hop+chileno,videos&maxResults=36&key=AIzaSyBenGb4BOSSx8_G9Ec2ONZY12Dmu4TwIy8`)
    .then((response) => response.json())
    .then((data) => { 
        console.log(data);
        setPost(data.items);
      //  setUsuarios(data);
       // setTablaUsuarios(data);
    })
    .catch(function(err) {
        console.log(`Error: ${err}`)
    });
    
    



}

const EditContent = (contenido) => {

    let regexIframe = /<iframe.*?src="(.*?)"/;
    let cadena = contenido;
    let urlIframe = regexIframe.exec(cadena)[1];
    let idYoutube = YoutubeGetID(urlIframe);
    console.log(idYoutube, urlIframe);

    return [idYoutube, urlIframe];
}


const abrirModal = (title, url) => { 
    setInfo({ titulo: title, urlVideo: ' ' });
    setTimeout(() => {
        setInfo({ titulo: title, urlVideo: url });
    }, 500);
    
    modal.show();
}

useEffect(()=>{
peticionGet();
setModal(
    new Modal(exampleModal.current)
)
},[])

  return (
    <>
    <div className="containerInput">
                <input
                className="form-control inputBuscar"
                value={busqueda}
                placeholder="Búsqueda por Nombre "
                onChange={handleChange}
                />
                <button className="btn btn-success">
                    buscar
                </button>
            </div>
        <div>
        {post ? (<p>si hay posts </p>) : 
                    (<p>NO HAY post</p>)
                }
                {post && post.map((item) => 
                    (
                        <div key={item.id}>
                            <a href={void(0)} onClick={() => abrirModal(item.title,EditContent(item.content)[1] )} className="box-video" data-title={item.title} >
                                <h2 style={{ color: 'white'}}>{item.title}</h2>
                                
                                
                                {/* <div dangerouslySetInnerHTML={{ __html: item.content }} /> */}
                            </a>
                            
                        </div>

                    ))
                }  

                


                

            </div>
            <ModalB modal={modal} exampleModal={exampleModal} info={info} />
    </>
  );
}

export default Buscador;