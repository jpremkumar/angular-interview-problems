import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';

// Custom Validator
function containsAngularValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value as string;
  if (value && value.toLowerCase().includes('angular')) {
    return null; // Valid
  }
  return { containsAngular: 'This field must contain the word "Angular"' }; // Invalid
}

@Component({
  standalone: false,
  selector: 'app-material-issues',
  templateUrl: './material-issues.html',
  styleUrls: ['./material-issues.css'],
  // Using ViewEncapsulation.None to allow global styles to pierce component encapsulation for the demo.
  // In real scenarios, ::ng-deep or targeting global styles more specifically is preferred over None.
  // Or, better yet, use Material theming capabilities or CSS custom properties if available.
  encapsulation: ViewEncapsulation.None, // Be cautious with this in real apps
})
export class MaterialIssues implements OnInit {
  userForm!: FormGroup;
  frameworks = [
    { value: 'angular', viewValue: 'Angular' },
    { value: 'react', viewValue: 'React' },
    { value: 'vue', viewValue: 'Vue' },
  ];

  tooltipText = "This is a standard mat-tooltip.";

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      framework: ['', Validators.required],
      experience: ['', [Validators.required, Validators.min(1), Validators.max(20)]],
      projectDescription: ['', [Validators.required, containsAngularValidator]]
    });
  }

  get name() { return this.userForm.get('name'); }
  get email() { return this.userForm.get('email'); }
  get framework() { return this.userForm.get('framework'); }
  get experience() { return this.userForm.get('experience'); }
  get projectDescription() { return this.userForm.get('projectDescription'); }

  onSubmit(): void {
    if (this.userForm.valid) {
      console.log('Form Submitted!', this.userForm.value);
      alert('Form is valid and submitted! Check the console.');
    } else {
      console.log('Form is invalid');
      alert('Form is invalid. Please check the errors.');
      this.userForm.markAllAsTouched(); // Show errors on all fields
    }
  }
}
