import React, { useState, useEffect, useRef, useContext } from 'react';
import "./Home.css"; 

import BotonVermas from './BotonVermas';
import ModalB from './ModalB';
import YoutubeGetID from './YoutubeGetID';
import VideoList from './VideoList';
import { Modal } from 'bootstrap';
import { Provider } from './DataContext';




export default function Home() {

const [post, setPost] = useState();

const [token, setToken] = useState([]);


console.log(document.readyState)

 let datos2 = [];
 let datos3 = {};
 let currentToken = [];




  
    const getApiData = async () => {
        const response = await fetch(
          "https://www.googleapis.com/blogger/v3/blogs/4209688436429267338/posts?labels=hip+hop+chileno,videos&maxResults=100&nextPageToken&key=AIzaSyBenGb4BOSSx8_G9Ec2ONZY12Dmu4TwIy8"
        ).then((response) => response.json())
        .then(data => { 

            
            console.log(data.nextPageToken);
            

            data.items.map( res => {
                let nuevoTitulo = res.title.replace('descarga','video');
                let regexIframe = /<iframe.*?src="(.*?)"/;
                let cadena = res.content;
                let urlIframe = regexIframe.exec(cadena)[1];
                let idYoutube = YoutubeGetID(urlIframe);

                let datos3 = {
                    titulo: nuevoTitulo,
                    contenido: res.content,
                    id: res.id,
                    idYoutube: idYoutube
                }

                datos2.push(datos3);
                

                
            }) 
           
                console.log(datos3)

            // let nuevos = data.items.push(['hola']);

            // console.log('nuevos', nuevos);

            let items2 = data.items;
            console.log('items2', items2)
            setPost(data.items);

            currentToken.push(data.nextPageToken);


            console.log(currentToken)

            setToken(data.nextPageToken);

            console.log('content', data.items[0].content)

            

            
            
        })
    };



   const EditContent = (contenido) => {

        let regexIframe = /<iframe.*?src="(.*?)"/;
        let cadena = contenido;
        let urlIframe = regexIframe.exec(cadena)[1];
        let idYoutube = YoutubeGetID(urlIframe);

        return [idYoutube, urlIframe];
    }
    

    useEffect(() => {
        getApiData();
        console.log('datos2', datos2)

        
       
        
      }, []);

      console.log(EditContent);
      
    const [info, setInfo] = useState(null);
      


      console.log(currentToken);
      console.log(token);

      const abrirModal = (title, url) => { 
        setInfo({ titulo: title, urlVideo: ' ' });
       
        setTimeout(() => {
            setInfo({ titulo: title, urlVideo: url });
          }, 500);
        
        modal.show();
        
        
       
        console.log('title', title);
        console.log('info', info);

       

      }


    const [modal, setModal] = useState(null)
    const exampleModal = useRef()

    useEffect(() => {
    setModal(
        new Modal(exampleModal.current)
    )
    console.log('info', info);
    }, [])
    console.log('post home', post);

 

    

return (
   
      <>
      { document.readyState != 'complete' ?  <p style={{color: 'white'}}>cargando</p>  : <p style={{color: 'white'}}>listo</p> }
        <Provider value={{post, setPost}}>
        <div id="posts" className="row m-0">
            {post && post.map((item) => 
                (
                    <div key={item.id} className="col-lg-2 col-md-3 col-sm-6 col-6 p-0">
                        <a href={void(0)} onClick={() => abrirModal(item.title,EditContent(item.content)[1] )} className="box-video" data-url={EditContent(item.content)[1]} data-idyt={ EditContent(item.content)[0]} data-title={item.title} style={{backgroundImage: "url(https://img.youtube.com/vi/"+EditContent(item.content)[0]+"/0.jpg)", backgroundSize: "cover"}}>
                            <span className="overlay"></span>
                            <h2>{item.title.replace('descarga','video')}</h2> 
                            
                        
                        </a>
                    </div>
                ))
            }  
            
            
            
        </div>
        <BotonVermas token={token}  setToken={setToken}></BotonVermas>
        <ModalB modal={modal} exampleModal={exampleModal} info={info} />
        </Provider>
       
        </>
        
   
  )
}