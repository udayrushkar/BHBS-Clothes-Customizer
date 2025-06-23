

import React, { useState, useRef } from "react";
import { Slider } from "./ui/slider";

export default function Warmerjacket({color1,logos, showSecondColor, secondColor, selectValue}: any) {
  const [selectedLogoIndex, setSelectedLogoIndex] = useState(-1);
  const [sizes, setSizes] = useState([40, 40, 40]);
  
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [positions, setPositions] = useState<{ x: number; y: number }[]>([{x:0,y:0},{x:0,y:0},{x:0,y:0}]);
  const [color2, setColor2] = useState("#000000");

  const fileInputRefs = [useRef(null), useRef(null), useRef(null)];
  const canvasRef = useRef(null);

  // Check if a click is on a specific logo
  const getClickedLogoIndex = (e: any) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Check each logo in reverse order (top to bottom in z-index)
    for (let i = logos.length - 1; i >= 0; i--) {
      if (!logos[i]) continue;
      
      const logoRect = {
        x: 200 + positions[i].x - sizes[i] / 2,
        y: 250 + positions[i].y - sizes[i] / 2,
        width: sizes[i],
        height: sizes[i],
      };

      if (
        mouseX >= logoRect.x &&
        mouseX <= logoRect.x + logoRect.width &&
        mouseY >= logoRect.y &&
        mouseY <= logoRect.y + logoRect.height
      ) {
        return i;
      }
    }
    return -1;
  };

  const handleMouseDown = (e: any) => {
    e.preventDefault();
    const clickedLogoIndex = getClickedLogoIndex(e);
    
    if (clickedLogoIndex !== -1) {
      // Select the clicked logo
      setSelectedLogoIndex(clickedLogoIndex);
      
      // Start dragging immediately
      setIsDragging(true);
      const rect = e.currentTarget.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      setDragOffset({
        x: mouseX - (200 + positions[clickedLogoIndex].x),
        y: mouseY - (250 + positions[clickedLogoIndex].y),
      });
    } else {
      // Clicked outside any logo - deselect
      setSelectedLogoIndex(-1);
      setIsDragging(false);
    }
  };

  const handleMouseMove = (e: any) => {
    if (!isDragging || selectedLogoIndex === -1 || !logos[selectedLogoIndex]) return;

    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Direct position update without spread operator for better performance
    setPositions(prevPositions => {
      const newPositions = [...prevPositions];
      newPositions[selectedLogoIndex] = {
        x: mouseX - 200 - dragOffset.x,
        y: mouseY - 250 - dragOffset.y,
      };
      return newPositions;
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Handle wheel scrolling for resizing
  const handleWheel = (e: any) => {
    e.preventDefault();
    
    const clickedLogoIndex = getClickedLogoIndex(e);
    if (clickedLogoIndex === -1) return;

    const delta = e.deltaY > 0 ? -5 : 5; // Scroll down = smaller, scroll up = bigger
    const newSizes = [...sizes];
    const newSize = Math.max(20, Math.min(200, sizes[clickedLogoIndex] + delta));
    newSizes[clickedLogoIndex] = newSize;
    setSizes(newSizes);
    
    // Also select the logo being resized
    setSelectedLogoIndex(clickedLogoIndex);
  };

  const resetPosition = () => {
    if (selectedLogoIndex === -1) return;
    
    const newPositions = [...positions];
    const newSizes = [...sizes];
    newPositions[selectedLogoIndex] = { x: 0, y: 0 };
    newSizes[selectedLogoIndex] = 100;
    setPositions(newPositions);
    setSizes(newSizes);
  };

  const handleSizeChange = (value: any) => {
    console.log("sizeChnage called")
    
  
    // Ensure a logo is selected
    if (selectedLogoIndex === -1) return;
  
    const newSize = +value;
  
    // Update sizes array with new value
    setSizes(prevSizes => {
      const updatedSizes = [...prevSizes];
      updatedSizes[selectedLogoIndex] = newSize;
      return updatedSizes;
    });
  };
  
console.log("size",sizes)
  return (
    <>
      <div className="bg-gradient-to-br w-full">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-3">
              <div className="">
                <div className="flex justify-center">
                  <div
                    className="relative bg-white overflow-hidden cursor-move select-none"
                    style={{ 
                      width: "1200px",
                      height:"420px"
                    }}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    onWheel={handleWheel}
                  >
<svg width="380" height="444" viewBox="0 0 320 350"  style={{margin:"auto",marginTop:"-10px",marginLeft:"100px"}} fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="1365.33" transform="translate(0 -32)" fill="white" style={{width:"100%",maxWidth:"100%"}}/>

<path fill-rule="evenodd" clip-rule="evenodd" d="M133.572 0.137592C121.503 0.553168 116.04 1.83237 112.413 5.09114C108.381 8.71454 105.793 14.0586 102.196 26.1896C101.367 28.9866 101.936 28.5951 94.2268 31.6701C87.9861 34.1594 84.0838 35.6167 73.809 39.2958C54.898 46.0678 51.1695 47.8841 46.8496 52.4292C40.7546 58.8419 34.8612 71.6565 29.3925 90.3878C25.0234 105.353 22.4425 118.121 20.2997 135.371C19.0639 145.319 18.7428 147.219 16.8787 155.629C15.1434 163.457 14.3442 168.657 14.3442 172.123C14.3442 174.821 13.9958 176.783 12.6467 181.68C11.5925 185.506 11.5871 185.557 11.9644 187.981L12.3448 190.425L11.3066 192.316C9.76201 195.13 8.78375 197.781 8.25349 200.589C7.8347 202.806 7.19295 208.907 5.55596 226.232C4.86176 233.578 4.62092 235.392 3.02416 245.298C0.870909 258.657 0.522765 261.886 0.502198 268.683C0.481333 275.553 0.549889 275.792 3.44951 278.944C4.33298 279.905 5.1324 281.093 5.24746 281.617C5.47548 282.653 5.42898 283.127 4.30765 291.247C3.71657 295.525 3.61732 296.927 3.8823 297.246C4.40839 297.88 6.50978 298.306 11.472 298.787C13.9535 299.028 18.9938 299.575 22.6729 300.003L29.3624 300.78L29.8578 300.169C30.1482 299.81 30.4346 298.716 30.5497 297.526C30.6578 296.408 31.1595 292.612 31.665 289.09C32.5318 283.048 32.6323 282.634 33.4335 281.791C35.0994 280.038 35.7724 277.943 36.4151 272.512C37.3102 264.947 39.757 251.279 43.3937 233.53C46.6138 217.815 47.6538 211.193 50.1084 190.781C51.7605 177.044 52.2226 174.552 53.7835 170.955C54.8807 168.428 55.194 167.239 55.9407 162.778C56.2012 161.222 57.1329 156.262 58.0114 151.756C58.8898 147.25 59.665 143.161 59.7339 142.67C59.97 140.989 59.942 147.733 59.6528 162.183C59.077 190.954 58.0096 214.858 56.527 232.19C56.1416 236.696 55.8518 240.408 55.8831 240.439C55.9144 240.471 57.8146 239.963 60.1056 239.31C77.4839 234.359 108.307 226.501 108.722 226.916C108.815 227.009 108.963 237.382 109.052 249.969C109.253 278.342 108.791 289.353 107.015 298.552C104.315 312.533 95.946 319.156 80.9627 319.169C72.6916 319.175 62.8252 317.404 52.546 314.067C50.5236 313.411 48.8377 312.918 48.7992 312.972C48.5948 313.261 47.7235 322.008 47.7256 323.752L47.728 325.794L49.4538 327.476C50.5906 328.583 52.1978 329.687 54.163 330.71C69.0202 338.44 95.8897 343.085 129.921 343.808L138.937 343.999V214.711V85.4226H139.831H140.726V214.711V344L150.487 343.802C177.582 343.252 199.158 340.344 215.392 335.055C224.503 332.087 230.623 328.617 232.05 325.611C232.508 324.648 232.5 324.247 231.931 319.422C231.597 316.584 231.261 313.976 231.185 313.626C231.047 312.994 231.026 312.997 227.839 314.011C221.701 315.964 214.327 317.673 207.94 318.622C203.895 319.224 194.579 319.142 191.248 318.476C179.798 316.186 174.065 309.202 172.186 295.255C171.033 286.698 170.526 274.727 170.557 256.767C170.584 241.476 170.896 227.258 171.212 226.943C171.635 226.52 202.739 234.368 218.376 238.843L223.887 240.42V239.496C223.887 238.988 223.69 236.231 223.45 233.37C222.461 221.586 221.552 204.463 220.913 185.568C220.568 175.38 219.996 148.211 220.046 144.457C220.078 142.093 220.081 142.086 220.351 143.564C223.573 161.158 224.941 167.937 225.582 169.481C227.918 175.108 228.025 175.651 229.843 191.079C232.001 209.382 233.589 219.454 236.704 234.573C239.948 250.322 242.642 265.623 243.395 272.582C243.967 277.861 244.536 279.555 246.445 281.657C247.012 282.282 247.263 283.24 247.855 287.02C248.251 289.551 248.799 293.498 249.073 295.792C249.367 298.258 249.734 300.133 249.971 300.378C250.315 300.733 251.364 300.68 257.175 300.011C260.916 299.581 266.056 299.02 268.597 298.766C275.325 298.092 276.557 297.642 276.219 295.979C275.64 293.124 274.882 287.918 274.703 285.569C274.427 281.944 274.793 280.659 276.726 278.45C278.445 276.487 278.965 275.398 279.363 272.925C279.925 269.441 278.715 256.913 276.515 243.416C275.285 235.866 274.945 232.932 273.211 214.912C272.478 207.293 271.67 200.188 271.417 199.123C271.163 198.058 270.279 195.779 269.451 194.058C267.881 190.791 267.762 190.154 268.147 187.05C268.332 185.556 268.233 184.759 267.552 182.284C266.102 177.009 265.891 175.812 265.611 171.269C265.309 166.354 264.788 163.217 262.79 154.288C262.058 151.011 261.046 145.381 260.542 141.776C260.038 138.172 259.221 132.34 258.725 128.817C254.736 100.428 245.596 70.3195 237.009 57.2833C235.077 54.3492 232.046 51.0883 229.686 49.4055C226.045 46.8087 219.35 43.8791 207.94 39.8904C196.228 35.7958 180.794 29.8597 179.276 28.8659C178.894 28.6151 178.58 28.2335 178.58 28.0178C178.58 27.1533 174.118 15.0033 172.931 12.6349C170.55 7.88488 167.692 4.66096 164.401 3.01028C161.383 1.49663 155.879 0.532017 148.773 0.270457C146.396 0.182874 143.378 0.0699674 142.067 0.0193237C140.755 -0.0316178 136.933 0.0217079 133.572 0.137592ZM124.157 31.8098C123.876 32.5412 125.53 39.8082 126.844 43.6169C127.551 45.665 129.336 49.8878 130.812 53.0009C132.288 56.114 133.998 60.0016 134.611 61.6401C135.862 64.9784 137.149 69.7601 137.149 71.069C137.149 71.9205 137.158 71.9252 137.894 71.4435C138.838 70.8254 138.843 70.1155 137.927 66.5058C136.996 62.8392 135.258 58.4159 132.151 51.8093C128.284 43.5842 126.895 39.5699 126.128 34.3983C125.947 33.1784 125.653 32.0055 125.476 31.7916C125.055 31.2846 124.355 31.2941 124.157 31.8098ZM154.314 32.0538C154.235 32.433 153.886 34.1302 153.538 35.825C152.509 40.8464 151.361 43.8582 146.309 54.7883C143.815 60.183 142.386 64.0287 141.472 67.8001C141.067 69.4702 140.768 70.8522 140.805 70.8715C140.844 70.8906 141.219 71.1206 141.639 71.3824L142.403 71.8588L142.749 69.8435C143.409 65.9916 145.992 59.2733 150.477 49.7368C153.636 43.0232 155.346 37.4462 155.691 32.7434C155.766 31.7082 155.691 31.5396 155.118 31.458C154.629 31.3886 154.42 31.5435 154.314 32.0538ZM138.238 72.1647C137.816 72.6307 137.745 73.5127 137.745 78.2548C137.745 83.6474 137.763 83.8128 138.407 84.2638C138.772 84.5188 139.413 84.7276 139.831 84.7276C140.25 84.7276 140.891 84.5188 141.255 84.2638C141.9 83.8128 141.918 83.6492 141.918 78.2029C141.918 73.1588 141.864 72.5571 141.373 72.1129C140.636 71.4465 138.862 71.476 138.238 72.1647ZM94.6739 231.731C84.0975 234.394 72.1458 237.589 59.2922 241.192L55.8039 242.17L55.6375 243.212C55.5457 243.786 54.9335 250.288 54.2766 257.661C52.7746 274.517 52.1978 280.489 50.565 296.09C49.8449 302.972 49.2138 309.192 49.1626 309.913L49.0693 311.224L51.1558 311.939C61.2758 315.407 73.0543 317.69 80.8136 317.686C86.4722 317.683 92.1585 316.325 95.87 314.09C96.8015 313.53 98.4099 312.177 99.4439 311.084C105.166 305.039 106.908 296.628 107.525 272.083C107.742 263.491 107.386 228.603 107.082 228.634C106.979 228.645 101.395 230.038 94.6739 231.731ZM172.177 246.555C171.769 280.558 172.896 296.881 176.205 304.902C179.182 312.117 185.214 316.217 194.527 317.358C202.595 318.346 213.823 316.712 226.346 312.728L230.742 311.329L230.739 310.412C230.738 309.908 230.533 307.686 230.284 305.474C228.537 289.941 227.135 275.585 225.382 255.277C224.196 241.539 224.277 242.112 223.49 241.938C223.135 241.859 218.753 240.647 213.752 239.244C202.383 236.053 189.812 232.772 180.518 230.569C176.583 229.637 173.146 228.812 172.878 228.736C172.435 228.61 172.374 230.162 172.177 246.555Z" fill={color1}/>
</svg>

                    {logos.map((logo: any, index: any) => (
                      logo && (
                        <img
                          key={index}
                          src={logo}
                          alt={`Logo ${index + 1}`}
                          className={`absolute pointer-events-none select-none ${
                            selectedLogoIndex === index 
                              ? 'ring-2 ring-blue-500 ring-opacity-50' 
                              : ''
                          }`}
                          style={{
                            width: `${sizes[index]}px`,
                            height: `${sizes[index]}px`,
                            left: `${200 + positions[index].x - sizes[index] / 2}px`,
                            top: `${250 + positions[index].y - sizes[index] / 2}px`,
                            objectFit: "contain",
                            transform: selectedLogoIndex === index && isDragging 
                              ? 'scale(1.01)' 
                              : 'scale(1)',
                            zIndex: selectedLogoIndex === index ? 10 : 1,
                           
                          }}
                          draggable="false"
                        />
                      )
                    ))}

                    {selectedLogoIndex !== -1 && logos[selectedLogoIndex] && (
                      <div className="absolute bottom-6 left-4 text-xs text-gray-500 bg-white bg-opacity-90 px-3 py-2 rounded-lg shadow-sm" style={{width:"510px"}}>
                        <div>Click logo to select • Drag to move • Scroll to resize</div>
                        <div className="text-blue-600 font-medium">
                          Logo {selectedLogoIndex + 1} selected (Size: {sizes[selectedLogoIndex]}px)
                        </div>
                      </div>
                    )}
                    {selectedLogoIndex !== -1 && logos[selectedLogoIndex] && (
                      <Slider  onValueChange={(val)=>{
                        handleSizeChange(val[0])
                      }} className="absolute bottom-2 left-4" defaultValue={[33]} max={100} step={1} />
                    )}

                  
                  </div>
                </div>
              </div>
            </div>
          </div>

          <canvas ref={canvasRef} className="hidden" />
        </div>
      </div>
    </>
  );
}