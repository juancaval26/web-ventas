import React from "react";
import CalzadoNuevo from "./CalzadoNuevo";
import Destacados from "./Destacados";
import GaleriaGeneral from "./GaleriaGeneral";

function GaleriaInicio() {
    const redirectToURL = (url) => {
      window.location.href = url;
    };
  
    return (
      <div>
        {/* <GaleriaGeneral/> */}
      </div>
      // <div className="scroll-container">
      //   <div className="image-container" style={{ textAlign: "center" , justifyItems: "center"}}>
      //       <img src={GaleriaNike} alt="Calzado" onClick={() => redirectToURL('CalzadoGeneral')} title="Calzado"/>
      //       <span className="" ><b>Calzado General</b></span>
      //   </div>
      //   <div className="image-container" style={{ textAlign: "center" , justifyItems: "center"}}>
      //       <img src={GaleriaNike} alt="Destacado" onClick={() => redirectToURL('Destacados')} title="Destacados"/>
      //       <span className=""><b>Destacado</b></span>
      //   </div>
      //   <div className="image-container" style={{ textAlign: "center" , justifyItems: "center"}}>
      //       <img src={GaleriaNike} alt="CalzadoNuevo" onClick={() => redirectToURL('CalzadoNuevo')} title="CalzadoNuevo"/>
      //       <span className=""><b>Nuevo</b></span>
      //   </div>
        // <div></div>
      // </div>
    );
  }

export default GaleriaInicio;