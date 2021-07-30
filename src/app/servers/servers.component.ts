import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-servers',
  // selector: '[app-servers]',
  // selector: '.app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  allowNewServer = false;
  serverCreationStatus = 'No Server was created!'
  serverName = '';
  serverCreated = false;
  servers = ['1', '2'];

  constructor() {
    setTimeout(() => {
      this.allowNewServer = true
    }, 2000)
  }

  ngOnInit(): void {
  }

  onCreateServer(server: HTMLInputElement) {
    this.serverCreated = true;
    this.servers.push(server.value);
    this.serverCreationStatus = 'Server was created! Name is' + server.value;
  }

  /*onUpdateServerName(event: Event) {
    this.serverName = (<HTMLInputElement>event.target).value;
  }*/
}
