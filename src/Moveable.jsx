import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import Moveable from "react-moveable";

export default function MyComponent() {
  const [moveablesArr, setMoveablesArr] = useState([]);
  const [currentId, setCurrentId] = useState(null);
  const moveableRef = useRef(null);
  const containerRef = useRef(null);

  const getElement = ({ type, id }) => {
    switch (type) {
      case "button":
        return (
          <button
            onClick={() => {
              setCurrentId(id);
            }}
            id={id}
          >
            button
          </button>
        );
      case "text":
        return (
          <div
            onClick={() => {
              setCurrentId(id);
              document.getElementById(id).focus();
            }}
            spellCheck="false"
            contentEditable
            id={id}
          >
            Text
          </div>
        );
      case "image":
        return (
          <div
            style={{ maxWidth: "100%" }}
            onClick={() => {
              setCurrentId(id);
            }}
            id={id}
          >
            <img
              width={"100%"}
              src="https://lh3.googleusercontent.com/hwau7OVWx96XaME5KpRuJ0I_MscrerK6SbRH1UwYHYaxIDQQtn7RZK02LDSfBzCreidFgDsJeXyqDct6EZiH6vsV=s1280-w1280-h800"
            />
          </div>
        );
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        containerRef.current === event.target && // Clicked directly on the container
        !Array.from(containerRef.current.children).some((child) =>
          child.contains(event.target)
        )
      ) {
        setCurrentId(null); // Clicked outside of the container
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <div
        style={{
          width: "200px",
          display: "flex",
          flexDirection: "column",
          gap: 30,
        }}
      >
        <div
          style={{ cursor: "pointer" }}
          onClick={() => {
            setMoveablesArr([
              ...moveablesArr,
              { type: "button", id: `id-${moveablesArr.length}` },
            ]);
          }}
        >
          Add button
        </div>
        <div
          style={{ cursor: "pointer" }}
          onClick={() => {
            setMoveablesArr([
              ...moveablesArr,
              { type: "text", id: `id-${moveablesArr.length}` },
            ]);
          }}
        >
          Text
        </div>
        <div
          style={{ cursor: "pointer" }}
          onClick={() => {
            setMoveablesArr([
              ...moveablesArr,
              { type: "image", id: `id-${moveablesArr.length}` },
            ]);
          }}
        >
          Image
        </div>
      </div>
      <div>
        <div
          className="container"
          style={{
            width: "500px",
            height: "500px",
            border: "1px solid #ccc",
            position: "relative",
          }}
          ref={containerRef}
        >
          {moveablesArr.map((moveable) => (
            <>{getElement(moveable)}</>
          ))}
          <Moveable
            flushSync={flushSync}
            ref={moveableRef}
            target={document.getElementById(currentId)}
            draggable={true}
            throttleDrag={1}
            edgeDraggable={false}
            startDragRotate={0}
            throttleDragRotate={0}
            scalable={true}
            keepRatio={false}
            throttleScale={0}
            snappable={true}
            bounds={{
              left: "0%",
              top: "0%",
              right: "0%",
              bottom: "0%",
              position: "css",
            }}
            onDrag={(e) => {
              e.target.style.transform = e.transform;
            }}
            onScale={(e) => {
              e.target.style.transform = e.drag.transform;
            }}
            onBound={(e) => {
              console.log(e);
            }}
            onDragStart={({ target }) => {
              console.log(target);
            }}
            onDragEnd={() => {}}
            onClick={() => {
              console.log("first");
            }}
          />
        </div>
      </div>
    </div>
  );
}
