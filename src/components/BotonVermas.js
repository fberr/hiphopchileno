import React, { useState, useEffect } from 'react';
import HijoBoton from './HijoBoton';
import YoutubeGetID from './YoutubeGetID';

export default function BotonVermas({token}) {


    const [post, setPost] = useState([]);


    let ultimoToken = token;
    let currentToken = token;
    let datos2 = [];
    let arrayVideos = [];


   

    const next = () => {

        let ultimoToken = currentToken[currentToken.length - 1];
        console.log('hola click next');
        console.log(ultimoToken);
        console.log(currentToken);

        if (ultimoToken != undefined ) { 
            const response = fetch(
                `https://www.googleapis.com/blogger/v3/blogs/4209688436429267338/posts?labels=hip+hop+chileno,videos&maxResults=12&pageToken=${ultimoToken}&key=AIzaSyBenGb4BOSSx8_G9Ec2ONZY12Dmu4TwIy8`
                ).then((response) => response.json())
                .then(data => { 
                    // console.log(data);
                    // console.log(data.nextPageToken);
        
                    currentToken.push(data.nextPageToken);

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
                    arrayVideos = [ ...datos2];

                    setPost(arrayVideos);
                    console.log(post)
                   
                })
                
                
        }

        
    }


    // arrayForHoldingPosts = [...arrayForHoldingPosts, ...slicedPosts];
    // setPostsToShow(arrayForHoldingPosts);


    


    useEffect(() => {
        

        
        setPost(arrayVideos);
        console.log(arrayVideos);
      
    }, [])

    // const resultado = post.datos.map((ojo) =>  (
    //     console.log(ojo)


    // ));
    


  return (
    <>
        
        {/* <div className="row m-0"> */}
            
            {/* {
            post && post.map((item) => 
                (
                    <div key={item.id} className="col-lg-2 col-md-3 col-sm-6 col-6 p-0">
                        <a href={void(0)} onClick={()=>{console.log('...')}} className="box-video" data-url="" data-title={item.title} style={{backgroundImage: "url(https://img.youtube.com/vi/"+item.idYoutube+"/0.jpg)"}}>
                            <span className="overlay"></span>
                            <h2>{item.titulo}</h2> 
                        
                        </a>
                    </div>
                )) 
            
            }    */}
        {/* </div> */}
        <HijoBoton post={post} hola={'hey'}></HijoBoton>
        <div id="more-loading">
	        <div className="spinner-border text-light" role="status">
  			    <span className="visually-hidden">Loading...</span>
	        </div>
        </div>
        <button type="button" onClick={next} className="btn btn-danger next">VER MÁS - {ultimoToken}</button>
        
    </>
  )
}
