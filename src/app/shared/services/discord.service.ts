import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'environments/environment';

@Injectable({ providedIn: 'root' })
export class DiscordService {
  private discordEndpoint =
    environment.discord.host +
    environment.discord.serverId +
    environment.discord.webHook;

  private botUsername = environment.discord.botUsername;

  errorColor = '#C70039';
  warningColor = '#E8BB1A';

  constructor(private http: HttpClient) {}

  sendErrorMessage(message: string) {
    const data = {
      username: this.botUsername,
      embeds: [
        {
          title: 'ERROR!',
          description: message,
          footer: {
            text: `BUG: ${
              environment.production ? 'production' : 'development'
            }`,
          },
          timestamp: new Date().toISOString,
          color: this.hexToDecimal(this.errorColor),
        },
      ],
    };
    return this.sendMessage(data);
  }

  sendWarningMessage(message: string) {
    const data = {
      username: this.botUsername,
      embeds: [
        {
          title: 'WARNING!',
          description: message,
          footer: {
            text: `ISSUE: ${
              environment.production ? 'production' : 'development'
            }`,
          },
          timestamp: new Date().toISOString,
          color: this.hexToDecimal(this.warningColor),
        },
      ],
    };
    this.sendMessage(data);
  }

  private sendMessage(data: any) {
    this.http
      .post(this.discordEndpoint, data, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      })
      .subscribe();
  }

  private hexToDecimal(hex: string) {
    return parseInt(hex.replace('#', ''), 16);
  }
}
