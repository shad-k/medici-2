import React from 'react'

class ErrorBoundary extends React.Component<{}, { hasError: boolean }> {
  constructor(props: {}) {
    super(props)
    this.state = {
      hasError: false,
    }
  }

  static getDerivedStateFromError(error: React.ErrorInfo) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="h-full w-full flex items-center justify-center py-10 text-2xl">
          Something went wrong.
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
