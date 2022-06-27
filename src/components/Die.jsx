export default function Die(props) {

  // Get correct die face to render depending on the passed value
  function getDieFace(value) {
    switch (value) {
      case 1:
        return (
          <div class="die first-face">
            <span class="dot"> </span>
          </div>
        );
      case 2:
        return (
          <div class="die second-face">
            <span class="dot"> </span>
            <span class="dot"> </span>
          </div>
        );
      case 3:
        return (
          <div class="die third-face">
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
          </div>
        );
      case 4:
        return (
          <div class="die fourth-face">
            <div class="column">
                <span class="dot"></span>
                <span class="dot"></span>
            </div>
            <div class="column">
                <span class="dot"></span>
                <span class="dot"></span>
            </div>
          </div>
        );
      case 5:
        return (
          <div class="die fifth-face">
            <div class="column">
                <span class="dot"></span>
                <span class="dot"></span>
            </div>
            <div class="column">
              <span class="dot"></span>
            </div>
            <div class="column">
                <span class="dot"></span>
                <span class="dot"></span>
            </div>
          </div>
        );
      case 6:
        return (
          <div class="die sixth-face">
            <div class="column">
                <span class="dot"></span>
                <span class="dot"></span>
                <span class="dot"></span>
            </div>
            <div class="column">
                <span class="dot"></span>
                <span class="dot"></span>
                <span class="dot"></span>
            </div>
          </div>
        );
      default: return
    }
  }

  return (
    <div className="die-container">
        {getDieFace(props.value)}
    </div>
  )
}    
