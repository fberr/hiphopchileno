import React, { useState, useEffect } from 'react';
import "./Home.css"; 
import BotonVermas from './BotonVermas';
import Modal from './Modal';
import YoutubeGetID from './YoutubeGetID';
import VideoList from './VideoList';




export default function Home() {

const [post, setPost] = useState({ 
    datos: []
});

const [token, setToken] = useState([])


 let datos2 = [];
 let datos3 = {};
 let currentToken = [];




  
    const getApiData = async () => {
        const response = await fetch(
          "https://www.googleapis.com/blogger/v3/blogs/4209688436429267338/posts?labels=hip+hop+chileno,videos&maxResults=12&nextPageToken&key=AIzaSyBenGb4BOSSx8_G9Ec2ONZY12Dmu4TwIy8"
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

            let items2 = data.items;
            setPost({ datos: datos2 });

            currentToken.push(data.nextPageToken);


            console.log(currentToken)

            setToken(currentToken);

            
            
        })
    };


    
      
    
    

    const boxPosts = document.querySelector('#posts');
	const firstLoad = document.getElementById('first-load');
	
	// const next = document.querySelector('.next');
	const moreLoading = document.getElementById('more-loading');

    useEffect(() => {
        getApiData();
      }, []);


      console.log(currentToken)  

return (
    <>
        <div id="posts" className="row m-0" >
            {post.datos.map((item) => 
                (
                    <div key={item.id} className="col-lg-2 col-md-3 col-sm-6 col-6 p-0">
                        <a href={void(0)} onClick={()=>{console.log('...')}} className="box-video" data-url="" data-title={item.title} style={{backgroundImage: "url(https://img.youtube.com/vi/"+item.idYoutube+"/0.jpg)", backgroundSize: "cover"}}>
                            <span className="overlay"></span>
                            <h2>{item.titulo}</h2> 
                        
                        </a>
                    </div>
                ))
            }  
            {/* <VideoList post={post}  /> */}
            <BotonVermas token={token} ></BotonVermas>
            
        </div>
        <Modal></Modal>
    </>
  )
}