import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

  openTableInNewWindow(id: string, name: string, category: string) {
    const url = `/table/${id}/${name}/${category}`;
    const newWindow = window.open(url, '_blank', 'width=1200,height=800,scrollbars=yes,resizable=yes');
    if (!newWindow) {
      alert('Please allow popups for this site to open the table in a new window.');
    }
  }

  openSimpleTable() {
    const url = `/table?id=1&name=Products&category=Electronics`;
    const newWindow = window.open(url, '_blank', 'width=1200,height=800,scrollbars=yes,resizable=yes');
    if (!newWindow) {
      alert('Please allow popups for this site to open the table in a new window.');
    }
  }

}
