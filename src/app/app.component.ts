import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  length = 0;
  includeAlphabets = false;
  includeNumbers = false;
  includeSpecial = false;
  password = '';

  onChangeLength(event: Event) {
    const input = event.target as HTMLInputElement;
    //for converting string to integers
    const parsedValue = parseInt(input.value);

    // checking if the user is entering integers only
    if (!isNaN(parsedValue)) {
      this.length = parsedValue;
    }
  }

  //methods for ensuring check is clicked or not
  onClickUseAlphabets() {
    this.includeAlphabets = !this.includeAlphabets;
  }
  onClickUseNumbers() {
    this.includeNumbers = !this.includeNumbers;
  }
  onClickUseSpecial() {
    this.includeSpecial = !this.includeSpecial;
  }

  //helps to not generate code if length for the passoword not entered and no checkbox selected
  canGenerate(): boolean {
    return (
      this.length > 0 &&
      (this.includeAlphabets || this.includeNumbers || this.includeSpecial)
    );
  }

  onButtonClick() {
    const numbers = '1234567890';
    const alphabets = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const specialChar = '!@#$%^&*_,.?~';

    //include the number,alphabts,specialChar depending on the user requirement in validChar variable
    let validChars = '';
    if (this.includeAlphabets) {
      validChars += alphabets;
    }
    if (this.includeNumbers) {
      validChars += numbers;
    }
    if (this.includeSpecial) {
      validChars += specialChar;
    }

    //now generating random password
    let generatedPassword = '';
    for (let i = 0; i < this.length && this.canGenerate(); i++) {
      const index = Math.floor(Math.random() * validChars.length);
      generatedPassword += validChars[index];
    }
    this.password = generatedPassword;
  }
}
