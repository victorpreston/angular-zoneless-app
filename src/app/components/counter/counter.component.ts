import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="counter-wrapper">
      <div class="counter-card">
        <div class="counter-header">
          <h2>Counter</h2>
          <div class="counter-display">
            <div class="time-unit">
              <span class="number">{{ minutes.toString().padStart(2, '0') }}</span>
              <span class="label">MIN</span>
            </div>
            <span class="separator">:</span>
            <div class="time-unit">
              <span class="number">{{ seconds.toString().padStart(2, '0') }}</span>
              <span class="label">SEC</span>
            </div>
          </div>
        </div>

        <div class="progress-bar">
          <div class="progress" [style.width.%]="(seconds / 60) * 100"></div>
        </div>

        <div class="controls">
          <button 
            [class.active]="isRunning"
            class="control-btn start-btn" 
            (click)="startCounter()">
            {{ isRunning ? 'PAUSE' : 'START' }}
          </button>
          <button 
            class="control-btn reset-btn" 
            (click)="resetCounter()"
            [disabled]="!count">
            RESET
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .counter-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background: #f5f5f5;
      font-family: 'Inter', sans-serif;
    }

    .counter-card {
      background: white;
      padding: 2rem;
      border-radius: 16px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
      width: 100%;
      max-width: 400px;
      transition: all 0.3s ease;
    }

    .counter-card:hover {
      box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
    }

    .counter-header h2 {
      margin: 0;
      color: #333;
      font-size: 1.5rem;
      font-weight: 600;
      margin-bottom: 1.5rem;
    }

    .counter-display {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 1rem;
      margin-bottom: 2rem;
    }

    .time-unit {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .number {
      font-size: 3.5rem;
      font-weight: 700;
      color: #2d3748;
      line-height: 1;
    }

    .label {
      font-size: 0.875rem;
      color: #718096;
      margin-top: 0.5rem;
      font-weight: 500;
    }

    .separator {
      font-size: 3.5rem;
      font-weight: 700;
      color: #2d3748;
      margin-top: -1rem;
    }

    .progress-bar {
      height: 6px;
      background: #edf2f7;
      border-radius: 3px;
      overflow: hidden;
      margin-bottom: 2rem;
    }

    .progress {
      height: 100%;
      background: #4299e1;
      transition: width 0.3s ease;
    }

    .controls {
      display: flex;
      gap: 1rem;
    }

    .control-btn {
      flex: 1;
      padding: 0.875rem;
      border: none;
      border-radius: 8px;
      font-weight: 600;
      font-size: 0.875rem;
      cursor: pointer;
      transition: all 0.2s ease;
      text-transform: uppercase;
    }

    .start-btn {
      background: #4299e1;
      color: white;
    }

    .start-btn:hover {
      background: #3182ce;
    }

    .start-btn.active {
      background: #ed8936;
    }

    .start-btn.active:hover {
      background: #dd6b20;
    }

    .reset-btn {
      background: #edf2f7;
      color: #4a5568;
    }

    .reset-btn:hover {
      background: #e2e8f0;
    }

    .reset-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    @media (max-width: 480px) {
      .counter-card {
        margin: 1rem;
        padding: 1.5rem;
      }

      .number {
        font-size: 2.5rem;
      }

      .separator {
        font-size: 2.5rem;
      }
    }
  `]
})
export class CounterComponent implements OnDestroy {
  count = 0;
  isRunning = false;
  intervalId: any;

  constructor(private cdr: ChangeDetectorRef) {}

  get minutes(): number {
    return Math.floor(this.count / 60);
  }

  get seconds(): number {
    return this.count % 60;
  }

  startCounter() {
    if (!this.intervalId) {
      this.isRunning = true;
      this.intervalId = setInterval(() => {
        this.count++;
        this.cdr.detectChanges();
      }, 1000);
    } else {
      this.pauseCounter();
    }
  }

  pauseCounter() {
    this.isRunning = false;
    clearInterval(this.intervalId);
    this.intervalId = null;
    this.cdr.detectChanges();
  }

  resetCounter() {
    this.pauseCounter();
    this.count = 0;
    this.cdr.detectChanges();
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}