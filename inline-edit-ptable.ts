editRowIndex: number|null = null;
editingRow: any = null;

edit(rowIndex: number, rowData:any) {
  this.editingRow = { ...rowData };
  this.editRowIndex = rowIndex;
}
***********Below is for html td
<td>
  <ng-container *ngIf="editingRowIndex === rowIndex; else displayField">
    <input [(ngModel)]="rowData.someField" />
  </ng-container>
  <ng-template #displayField>
    {{ rowData.someField }}
  </ng-template>
</td>
****************blow it for buttons
<td *ngIf="editingRowIndex === rowIndex">
  <i class="pi pi-check" (click)="save(rowData, rowIndex)"></i>
  <i class="pi pi-times" (click)="cancel()"></i>
</td>
