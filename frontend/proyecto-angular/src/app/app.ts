import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

  currentNotification = signal<any | null>(null);
  friendsList = signal<any[]>([]);

  ngOnInit(): void {
    this.loadFriends();
    this.listenDatabaseEvents();
  }

  async loadFriends(): Promise<void> {
    try {
      const response = await fetch('http://localhost:3000/friends');
      const data = await response.json();

      console.log('Datos cargados:', data);
      this.friendsList.set(data);

    } catch (error) {
      console.error('Error cargando amigos:', error);
    }
  }

  listenDatabaseEvents(): void {
    const eventSource = new EventSource('http://localhost:3000/events-stream');

    eventSource.onmessage = (event: MessageEvent) => {
      const data = JSON.parse(event.data);

      if (data.message === 'connected') {
        console.log('SSE conectado');
        return;
      }

      console.log('Evento recibido:', data);

      this.currentNotification.set(data);
      this.loadFriends();
    };

    eventSource.onerror = (error: Event) => {
      console.error('Error SSE:', error);
    };
  }

}