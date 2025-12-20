import { createTheme } from "@mui/material/styles";

// Frosted Pearl design tokens
const tokens = {
  light: {
    primary: { main: '#7dd3fc', contrastText: '#04293a' },
    secondary: { main: '#fbcfe8' },
    background: { default: '#f8fafc', paper: '#ffffff' },
    text: { primary: '#0f172a', secondary: '#64748b' },
    vibrant: [ '#7dd3fc', '#f472b6', '#60a5fa', '#34d399', '#f59e0b' ],
  },
  dark: {
    primary: { main: '#7dd3fc', contrastText: '#061226' },
    secondary: { main: '#fbcfe8' },
    background: { default: '#061226', paper: '#0b1220' },
    text: { primary: '#e6eef8', secondary: '#9aa7bb' },
    vibrant: [ '#7dd3fc', '#f472b6', '#60a5fa', '#34d399', '#f59e0b' ],
  }
}

export const getTheme = (mode = 'light') => {
  const t = tokens[mode === 'dark' ? 'dark' : 'light'];

  return createTheme({
    palette: {
      mode,
      primary: t.primary,
      secondary: t.secondary,
      background: t.background,
      text: t.text,
    },
    shape: { borderRadius: 14 },
    typography: {
      fontFamily: "Inter, 'Inter var', Arial, sans-serif",
      h4: { fontWeight: 700, fontSize: '1.5rem' },
      h5: { fontWeight: 700, fontSize: '1.25rem' },
      body1: { fontSize: '0.98rem', lineHeight: 1.6 }
    },
    // Ensure the baseline doesn't override our body background gradient vars
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: { background: 'transparent' }
        }
      },
      MuiButton: {
        defaultProps: { disableElevation: true },
        styleOverrides: {
          root: {
            borderRadius: 12,
            textTransform: 'none',
            padding: '8px 14px',
            transition: 'transform 180ms cubic-bezier(.2,.9,.2,1), box-shadow 180ms',
            boxShadow: '0 6px 18px rgba(12,18,22,0.04)',
            '&:hover': { transform: 'translateY(-2px)' }
          },
          containedPrimary: {
            backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))'
          }
        }
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            boxShadow: '0 8px 28px rgba(12,18,22,0.06)',
            border: '1px solid rgba(15,23,42,0.04)'
          }
        }
      },
      MuiChip: {
        styleOverrides: {
          root: { borderRadius: 999, fontWeight: 600 }
        }
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backdropFilter: 'blur(8px)',
            background: mode === 'dark' ? 'rgba(8,12,18,0.64)' : 'rgba(255,255,255,0.66)'
          }
        }
      },
      MuiSnackbar: {
        styleOverrides: {
          root: { borderRadius: 12 }
        }
      },
      MuiTextField: {
        styleOverrides: {
          root: { borderRadius: 12 }
        }
      },
      MuiDialog: {
        styleOverrides: { paper: { borderRadius: 16 } }
      }
    }
  });
}
