import { Injectable, Renderer2, RendererFactory2, ElementRef } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Injectable({ providedIn: 'root' })
export class CSPManagerService {
  private _nonce: string = '';
  private _renderer: Renderer2;
  private _hostNodes: Map<Element, Element[]> = new Map();

  constructor(private rendererFactory: RendererFactory2, private metaService: Meta) {
    this._renderer = this.rendererFactory.createRenderer(null, null);
  }

  private _setCSPNonce(): void {
    const metaTag = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
    const nonceString = metaTag?.getAttribute('content') || '';
    this._nonce = (Math.floor(Math.random() * 10000) + 1).toString();
    if (metaTag) {
      let contentVal = `default-src 'self';script-src 'self' 'nonce-${this._nonce}';style-src 'self' 'nonce-${this._nonce}';img-src 'self' data:;connect-src 'self' ${environment.baseurl}`;
      if (environment.ssoURLs && Array.isArray(environment.ssoURLs)) {
        const ssoURLs = environment.ssoURLs.join(' ');
        contentVal = contentVal.replace(/connect-src[^;]*/, match => {
          return match.trim().replace(/;$/, '') + ' ' + ssoURLs.trim();
        });
      }
      this.metaService.updateTag({ httpEquiv: 'Content-Security-Policy', content: contentVal });
    }
  }

  private _removeCSPNonceHeader(): void {
    const meta = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
    meta?.remove();
  }

  addHost(hostNode: Element): void {
    const styleNodes: Element[] = [];
    this._hostNodes.set(hostNode, styleNodes);
  }

  removeHost(hostNode: Element): void {
    const styleNodes = this._hostNodes.get(hostNode);
    if (styleNodes) {
      styleNodes.forEach(this.removeStyle);
    }
    this._hostNodes.delete(hostNode);
  }

  onStyleAdded(style: string): void {
    this._hostNodes.forEach((styleNodes, hostNode) => {
      this._addStylesToHost(style, hostNode, styleNodes);
    });
  }

  ngOnDestroy(): void {
    this._hostNodes.forEach((styleNodes) => styleNodes.forEach(this.removeStyle));
  }

  private removeStyle(styleNode: Element): void {
    styleNode?.parentNode?.removeChild(styleNode);
  }

  private _addStylesToHost(style: string, hostNode: Element, styleNodes: Element[]): void {
    const styleEl = this._renderer.createElement('style');
    this._renderer.setProperty(styleEl, 'textContent', style);
    if (this._nonce) {
      this._renderer.setAttribute(styleEl, 'nonce', this._nonce);
    }
    this._renderer.appendChild(hostNode, styleEl);
    styleNodes.push(styleEl);
  }
}


--------------------------------END----------------------------------


import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CSPManagerService } from './csp-manager.service';
import { CustomDomSharedStylesHost } from './shared-styles-host';
import { ɵSharedStylesHost as SharedStylesHost } from '@angular/platform-browser';

@NgModule({
  providers: [
    { provide: 'cspMetaSelector', useValue: 'meta[http-equiv="Content-Security-Policy"]' },
    { provide: SharedStylesHost, useClass: CustomDomSharedStylesHost },
    CSPManagerService
  ],
  imports: [CommonModule]
})
export class InlineStylesCspModule { }
