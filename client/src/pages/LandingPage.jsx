import FloatingVegetables from '../components/FloatingVegetables';

export default function LandingPage({ ingredients, setIngredients, onGenerate, isLoading }) {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FFFDF0', position: 'relative', overflow: 'hidden' }}>
      <FloatingVegetables />
    </div>
  );
}
