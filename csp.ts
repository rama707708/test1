--------------------
shared_styles_host.ts
---------------------

  import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ɵDomSharedStylesHost as DomSharedStylesHost } from '@angular/platform-browser';

function getDOM(): any {
  return typeof document !== 'undefined' ? document : null;
}

function removeStyle(styleNode: Node): void {
  getDOM()?.removeChild?.(styleNode?.parentNode, styleNode);
}

@Injectable()
export class CustomDomSharedStylesHost extends DomSharedStylesHost {
  private _hostNodes = new Map<Node, Node[]>();

  constructor(@Inject(DOCUMENT) document: any) {
    super(document);
  }

  addHost(hostNode: Node): void {
    const styleNodes: Node[] = [];
    this._hostNodes.set(hostNode, styleNodes);
  }

  removeHost(hostNode: Node): void {
    const styleNodes = this._hostNodes.get(hostNode);
    if (styleNodes) {
      styleNodes.forEach(removeStyle);
    }
    this._hostNodes.delete(hostNode);
  }

  override onStyleAdded(style: string): void {
    this._hostNodes.forEach((styleNodes, hostNode) => {
      this._addStylesToHost(style, hostNode, styleNodes);
    });
  }

  override ngOnDestroy(): void {
    this._hostNodes.forEach((styleNodes) => styleNodes.forEach(removeStyle));
  }
}


---------------------------end--------------------------

--------------inline-styles-csp.module.ts--------------------------


import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomDomSharedStylesHost } from './shared_styles_host';
import { ɵSharedStylesHost as SharedStylesHost } from '@angular/platform-browser';

@NgModule({
  providers: [
    { provide: 'cspMetaSelector', useValue: 'meta[name="CSP-NONCE"]' },
    { provide: SharedStylesHost, useClass: CustomDomSharedStylesHost }
  ]
})
export class InlineStylesCspModule {}

