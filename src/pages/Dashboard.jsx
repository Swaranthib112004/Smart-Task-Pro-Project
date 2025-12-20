import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button, Typography, Box, Skeleton, CircularProgress } from "@mui/material";
import { loadTasks } from "../utils/tasks";
import { useAuth } from "../context/AuthContext";
import Grow from "@mui/material/Grow";
import Stats from '../components/Stats'
import ImageCard from '../components/visual/ImageCard'
import FloatingParticles from '../components/visual/FloatingParticles'
import StorySlides from '../components/visual/StorySlides'
import ParallaxLayers from '../components/visual/ParallaxLayers'
import AnalyticsPanel from '../components/visual/AnalyticsPanel'
import AnimatedBadge from '../components/ui/AnimatedBadge'
import CategoryImageCard from '../components/visual/CategoryImageCard'

export default function Dashboard() {
  const tasks = loadTasks();
  const [loading, setLoading] = useState(true);
  const completed = tasks.filter((t) => t.done).length;

  useEffect(() => {
    // simulate loading
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);
  console.log("Dashboard: tasks", tasks.length);
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4">Dashboard</Typography>

      <Grow in={mounted} timeout={420}>
        <Card sx={{ p: 3, mt: 2 }}>
          {loading ? (
            <Box>
              <Skeleton width={200} height={32} />
              <Skeleton width={150} />
              <Skeleton width={120} />
            </Box>
          ) : (
            <>
              <Typography variant="body1" sx={{ mb: 1 }}>Hello, <strong>{user?.email || 'User'}</strong></Typography>
              <Box sx={{ display: 'flex', gap: 3, alignItems: 'center', mt: 1 }}>
                <Grow in={mounted} style={{ transformOrigin: '0 0 0' }} timeout={520}>
                  <Box>
                    <Typography sx={{ fontSize: 20, fontWeight: 700 }}>{tasks.length}</Typography>
                    <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>Total Tasks</Typography>
                  </Box>
                </Grow>

                <Grow in={mounted} style={{ transformOrigin: '0 0 0' }} timeout={640}>
                  <Box>
                    <Typography sx={{ fontSize: 20, fontWeight: 700 }}>{completed}</Typography>
                    <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>Completed</Typography>
                  </Box>
                </Grow>
                <Grow in={mounted} style={{ transformOrigin: '0 0 0' }} timeout={760}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CircularProgress variant="determinate" value={Math.min(100, Math.round((completed / Math.max(1, tasks.length)) * 100))} size={48} thickness={5} />
                    <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>Completion</Typography>
                  </Box>
                </Grow>
              </Box>

              <Box sx={{ mt: 3 }}>
                <Button variant="contained" onClick={() => navigate('/tasks')}>Go to Tasks</Button>
              </Box>
              <Box sx={{ mt: 3 }}>
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                  <AnimatedBadge color="#34d399">Live</AnimatedBadge>
                  <Stats />
                </Box>

                <Box sx={{ mt: 3 }}>
                  <ImageCard title="Project Boards" subtitle="Visualize work" image="/images/board.jpg" />
                </Box>

                <Box sx={{ mt: 3 }}>
                  <AnalyticsPanel stats={{ series: [12, 18, 14, 22, 28, 34, 24] }} />
                </Box>

                <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
                  <CategoryImageCard image="/images/category1.jpg" category="Design" title="Landing Refresh" tags={["ux","copy","hero"]} />
                  <CategoryImageCard image="/images/category2.jpg" category="Sprint" title="Sprint 42" tags={["tasks","qa","deploy"]} />
                </Box>
              </Box>
            </>
          )}
        </Card>
      </Grow>
    </Box>
  );
}
