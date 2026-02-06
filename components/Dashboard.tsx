import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger, Button, Card, CardContent, CardHeader, CardTitle, Badge, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui';
import { CheckCircle2, Filter, TrendingUp, AlertCircle, Sparkles } from 'lucide-react';

// --- Sub-components ---

const PercursoSimples = ({ onAnalisarAvaliacao }: { onAnalisarAvaliacao: () => void }) => {
  const [filtros, setFiltros] = useState({
    serie: '6º ano',
    disciplina: 'Matemática',
    periodo: '2º Bimestre'
  });

  const mockData = [
    { id: '1', agrupador: 'Funções', nivel: '1.1', apelido: 'Representações numérica...', aulas: 2, material: 'Unidade 9, Sessão 1' },
    { id: '2', agrupador: 'Representação de dados', nivel: '2.1', apelido: 'Indução ao erro', aulas: 2, material: 'Unidade 10, Sessão 2' },
    { id: '3', agrupador: 'Representação de dados', nivel: '2.2', apelido: 'Seleção de gráficos', aulas: 1, material: 'Unidade 10, Sessão 3' }
  ];

  const totalAulas = mockData.reduce((sum, item) => sum + item.aulas, 0);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <Card className="border-0 shadow-sm bg-white overflow-hidden">
        <CardHeader className="pb-6 border-b border-gray-50">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-1">
              <CardTitle className="text-2xl font-bold text-gray-900 tracking-tight">
                Percurso de Aprendizagem
              </CardTitle>
              <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                <Badge variant="outline" className="bg-gray-50 border-gray-200">{filtros.serie}</Badge>
                <Badge variant="outline" className="bg-gray-50 border-gray-200">{filtros.disciplina}</Badge>
                <Badge variant="outline" className="bg-gray-50 border-gray-200">{filtros.periodo}</Badge>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button className="h-11 px-5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-sm transition-all">
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Liberar Percurso
              </Button>
              <Button 
                onClick={onAnalisarAvaliacao}
                className="h-11 px-5 bg-white border border-orange-200 text-orange-700 hover:bg-orange-50 rounded-xl shadow-sm transition-all flex items-center gap-2 font-semibold"
              >
                <TrendingUp className="w-4 h-4" />
                Analisar Avaliação
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50/50">
                <tr className="border-b border-gray-100">
                  <th className="w-16 py-4 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">#</th>
                  <th className="py-4 px-2 text-xs font-bold text-gray-500 uppercase tracking-widest">Habilidade / Foco</th>
                  <th className="py-4 px-6 text-center text-xs font-bold text-gray-500 uppercase tracking-widest">Carga</th>
                  <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-widest">Recurso de Apoio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {mockData.map((item, index) => (
                  <tr key={item.id} className="group hover:bg-blue-50/20 transition-colors">
                    <td className="py-5 px-6 font-mono text-xs text-gray-400">{index + 1}</td>
                    <td className="py-5 px-2">
                      <div className="space-y-0.5">
                        <div className="font-bold text-gray-900 group-hover:text-blue-700 transition-colors">{item.agrupador}</div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded leading-none uppercase">{item.nivel}</span>
                          <span className="text-sm text-gray-400 truncate max-w-[200px]">{item.apelido}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-5 px-6 text-center">
                      <span className="font-mono font-bold text-gray-700">{item.aulas}h</span>
                    </td>
                    <td className="py-5 px-6">
                      <span className="text-sm font-medium text-gray-600 bg-white border border-gray-100 px-3 py-1.5 rounded-lg shadow-sm">
                        {item.material}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 bg-gray-50/50 border-t border-gray-100 flex justify-end">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total do Percurso</span>
              <span className="text-xl font-black text-blue-600">{totalAulas}h</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const PriorizacaoRecomposicao = ({ onSalvar }: { onSalvar: () => void }) => {
  const [items, setItems] = useState([
    { id: '1', agrupador: 'Representação de dados', nivel: '2.1', apelido: 'Indução ao erro', peso: 3, aulas: 2 },
    { id: '2', agrupador: 'Funções', nivel: '1.1', apelido: 'Representações numéricas', peso: 2, aulas: 1 },
    { id: '3', agrupador: 'Estatística', nivel: '3.4', apelido: 'Médias complexas', peso: 1, aulas: 3 }
  ]);

  const updateWeight = (id: string, newWeight: number) => {
    setItems(items.map(item => item.id === id ? { ...item, peso: newWeight } : item));
  };

  const totalAulas = items.reduce((sum, item) => sum + item.aulas, 0);

  const getWeightStyle = (weight: number, isActive: boolean) => {
    if (!isActive) return "bg-gray-50 text-gray-300 border-gray-100 hover:border-gray-300";
    switch (weight) {
      case 3: return "bg-red-50 text-red-600 border-red-200 shadow-sm ring-1 ring-red-200";
      case 2: return "bg-orange-50 text-orange-600 border-orange-200 shadow-sm ring-1 ring-orange-200";
      case 1: return "bg-emerald-50 text-emerald-600 border-emerald-200 shadow-sm ring-1 ring-emerald-200";
      default: return "";
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <Card className="border-0 shadow-xl shadow-gray-200/50 bg-white overflow-hidden">
        <CardHeader className="pb-6 border-b border-gray-50">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <CardTitle className="text-2xl font-extrabold text-gray-900 tracking-tight">
                  Priorização
                </CardTitle>
                <Sparkles className="w-5 h-5 text-orange-400 fill-orange-400" />
              </div>
              <p className="text-sm text-gray-500 font-medium">Ajuste o peso (1-3) para definir a urgência da recomposição.</p>
            </div>
            <Button onClick={onSalvar} className="h-12 px-8 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-lg shadow-emerald-100 transition-all font-bold">
              <CheckCircle2 className="w-5 h-5 mr-2" />
              Gerar Plano de Ação
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="p-0">
          {/* Legenda Discreta no Topo da Tabela */}
          <div className="px-6 py-3 bg-gray-50/50 border-b border-gray-100 flex flex-wrap items-center gap-6 text-[10px] font-bold uppercase tracking-widest text-gray-400">
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> 1: Baixo</span>
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-orange-500" /> 2: Médio</span>
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-red-500" /> 3: Crítico</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  <th className="py-4 px-6 w-16">#</th>
                  <th className="py-4 px-2">Habilidade sob análise</th>
                  <th className="py-4 px-6 text-center w-56">Peso de Urgência</th>
                  <th className="py-4 px-6 text-right w-24">Aulas</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {items.map((item, index) => (
                  <tr key={item.id} className="group hover:bg-gray-50/40 transition-colors">
                    <td className="py-6 px-6 font-mono text-xs text-gray-300">{index + 1}</td>
                    <td className="py-6 px-2">
                      <div className="space-y-1">
                        <div className="font-bold text-gray-800 text-base">{item.agrupador}</div>
                        <div className="flex items-center gap-2 text-xs text-gray-400 font-medium">
                            <span className="border border-gray-100 px-1.5 py-0.5 rounded text-[10px] bg-white">{item.nivel}</span>
                            <span>{item.apelido}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-6 px-6">
                      <div className="flex justify-center">
                        <div className="flex p-1 bg-gray-100/50 rounded-xl border border-gray-100 gap-1">
                          {[1, 2, 3].map((v) => (
                            <button
                              key={v}
                              onClick={() => updateWeight(item.id, v)}
                              className={`w-10 h-10 rounded-lg text-sm font-black transition-all border flex items-center justify-center ${getWeightStyle(v, item.peso === v)}`}
                            >
                              {v}
                            </button>
                          ))}
                        </div>
                      </div>
                    </td>
                    <td className="py-6 px-6 text-right">
                      <span className="font-mono text-lg font-bold text-gray-900">{item.aulas}h</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-6 border-t border-gray-50 bg-gray-50/20 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-gray-400">
               <AlertCircle className="w-4 h-4" />
               <span className="text-xs font-medium">Os pesos influenciam a ordem e intensidade do material gerado.</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Total planejado</span>
              <div className="bg-emerald-50 text-emerald-700 px-4 py-1.5 rounded-xl border border-emerald-100 font-black text-xl">
                {totalAulas}h
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// --- Main Dashboard ---

export default function DashboardIntegrado() {
  const [activeTab, setActiveTab] = useState('percurso');

  return (
    <div className="max-w-6xl mx-auto p-6 md:p-10 space-y-10 pb-20">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-100">F</div>
             <h1 className="text-4xl font-black text-gray-900 tracking-tight">Focus<span className="text-blue-600">.</span></h1>
          </div>
          <p className="text-gray-400 font-medium text-lg leading-relaxed max-w-md">
            Otimize a recomposição de aprendizagem com inteligência de dados.
          </p>
        </div>
        
        <div className="bg-white p-1.5 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-1">
          <button 
            onClick={() => setActiveTab('percurso')}
            className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'percurso' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'}`}
          >
            Planejamento
          </button>
          <button 
            onClick={() => setActiveTab('priorizacao')}
            className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'priorizacao' ? 'bg-orange-500 text-white shadow-md' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'}`}
          >
            Recomposição
          </button>
        </div>
      </header>

      <main className="transition-all duration-500 ease-in-out">
        {activeTab === 'percurso' ? (
          <PercursoSimples onAnalisarAvaliacao={() => setActiveTab('priorizacao')} />
        ) : (
          <PriorizacaoRecomposicao onSalvar={() => alert('Plano Gerado!')} />
        )}
      </main>

      <footer className="pt-10 border-t border-gray-100 flex justify-between items-center text-[10px] font-bold text-gray-300 uppercase tracking-widest">
        <span>Dashboard de Gestão Pedagógica</span>
        <span>v2.0.4 • 2024</span>
      </footer>
    </div>
  );
}
