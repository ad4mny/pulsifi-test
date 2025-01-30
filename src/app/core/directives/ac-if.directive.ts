import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Role } from '../auth/auth.types';

@Directive({
  selector: '[acIf]',
  standalone: true,
})
export class AcIfDirective {
  private roles: Role[] = [];
  private unauthorizedTemplate: TemplateRef<any> | null = null;

  @Input() set acIf(roles: Role[] | Role) {
    this.roles = Array.isArray(roles) ? roles : [roles]; // Ensure roles are always an array
    this.updateView();
  }

  @Input() set acIfElse(unauthorizedTemplate: TemplateRef<any> | null) {
    this.unauthorizedTemplate = unauthorizedTemplate;
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: AuthService,
  ) {}

  private updateView() {
    const userRoles = this.authService.getRoles();
    const hasRole = this.roles.some((role) => userRoles.includes(role));
    if (hasRole) {
      this.viewContainer.clear();
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      if (this.unauthorizedTemplate) {
        this.viewContainer.clear();
        this.viewContainer.createEmbeddedView(this.unauthorizedTemplate);
      } else {
        this.viewContainer.clear();
      }
    }
  }
}
