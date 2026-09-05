import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { DocumentUploader } from '../components/upload/DocumentUploader';

describe('DocumentUploader Component', () => {
  it('renders upload instructions and accepts valid PDF files', async () => {
    const handleUploaded = vi.fn();
    render(<DocumentUploader onDocumentUploaded={handleUploaded} />);

    expect(screen.getByText(/Drag & drop your Resume or Project PDF/i)).toBeInTheDocument();

    const fileInput = screen.getByTestId('file-input');
    const validFile = new File(['sample content'], 'resume.pdf', { type: 'application/pdf' });

    fireEvent.change(fileInput, { target: { files: [validFile] } });

    await waitFor(() => {
      expect(handleUploaded).toHaveBeenCalled();
    });
  });

  it('displays error message for invalid file types', async () => {
    render(<DocumentUploader />);

    const fileInput = screen.getByTestId('file-input');
    const invalidFile = new File(['data'], 'script.exe', { type: 'application/x-msdownload' });

    fireEvent.change(fileInput, { target: { files: [invalidFile] } });

    await waitFor(() => {
      expect(screen.getByText(/Unsupported file format/i)).toBeInTheDocument();
    });
  });
});
