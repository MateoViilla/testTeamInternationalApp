import { Directive, HostListener } from "@angular/core";

//Directiva que restringe el uso de caracteres especiales en campos de texto
@Directive({
  selector: "[restrictSpecialCharacters]"
})
export class RestrictSpecialCharacters {
  @HostListener("keypress", ["$event"])
  public onkeypress(event: any): void {
      if (event.which != 34 && (event.which >= 48 && event.which <= 90
          && event.which != 60 && event.which != 61 && event.which != 62 
          && event.which != 63 && event.which != 64) //keys A-Z,0-9 uppercase except  <>, ""
          || (event.which >= 96 && event.which <= 105) //numpad keys 0-9
          || (event.which >= 97 && event.which <= 122) //keys a-z lowercase                        
          || event.which == 8//backspace
          || event.which == 32 //space
          || (event.which == 209 || event.which == 241) // letter ñ
          || event.which == 44 //comma
          || event.which == 46) //period
      {
          //keys permmited
      }
      else {
          //Avoid to type in the textarea
          event.preventDefault();
      }

  }
}