import { ChevronDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { Separator } from "./ui/separator";

export function InfoBlock() {
  return (
    <Card>
      <Collapsible>
        <CardHeader className="pb-3">
          <CollapsibleTrigger className="flex items-center justify-between w-full hover:opacity-80 transition-opacity">
            <CardTitle className="text-lg">Справочная информация</CardTitle>
            <ChevronDown className="h-5 w-5 transition-transform duration-200 data-[state=open]:rotate-180" />
          </CollapsibleTrigger>
        </CardHeader>
        <CollapsibleContent>
          <CardContent className="space-y-4 text-sm">
            <div>
              <h4 className="font-semibold mb-2 text-primary">Что такое эмбеддинг?</h4>
              <p className="text-muted-foreground">
                Эмбеддинг — это векторное представление текста в многомерном пространстве. 
                Каждое слово или фраза преобразуется в вектор чисел, где семантически похожие 
                тексты находятся близко друг к другу.
              </p>
              <p className="text-muted-foreground mt-2">
                <strong>Размерность вектора:</strong> зависит от модели (например, 1024 для «BGE-M3», 
                1536 для «OpenAI Ada-002», 3072 для «Embedding 3 Large»).
              </p>
            </div>

            <Separator />

            <div>
              <h4 className="font-semibold mb-2 text-primary">Косинусное сходство</h4>
              <p className="text-muted-foreground mb-2">
                Косинусное сходство измеряет угол между двумя векторами. Значение находится 
                в диапазоне от −1 до 1:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-2">
                <li><strong>1</strong> — векторы идентичны (угол 0°).</li>
                <li><strong>0</strong> — векторы ортогональны (угол 90°).</li>
                <li><strong>−1</strong> — векторы противоположны (угол 180°).</li>
              </ul>
              <div className="mt-3 p-3 bg-secondary rounded font-mono text-xs">
                cos(A, B) = (A · B) / (||A|| × ||B||)
              </div>
              <p className="text-muted-foreground mt-2 text-xs">
                где A · B — скалярное произведение, ||A|| и ||B|| — нормы векторов.
              </p>
            </div>

            <Separator />

            <div>
              <h4 className="font-semibold mb-2 text-primary">Почему косинус, а не евклидово расстояние?</h4>
              <p className="text-muted-foreground">
                Косинусное сходство измеряет <strong>направление</strong> векторов, игнорируя их длину. 
                Это важно для текстов, так как длина документа не должна влиять на семантическое сходство. 
                Евклидово расстояние учитывает и направление, и длину, что менее подходит для NLP-задач.
              </p>
            </div>

            <Separator />

            <div>
              <h4 className="font-semibold mb-2 text-primary">Применение в RAG-системах</h4>
              <p className="text-muted-foreground">
                В системах Retrieval-Augmented Generation (RAG) эмбеддинги используются для:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-2 mt-2">
                <li><strong>Semantic Search</strong> — поиск релевантных документов по смыслу, а не по ключевым словам.</li>
                <li><strong>Контекстный поиск</strong> — нахождение похожих фрагментов текста для генерации ответов.</li>
                <li><strong>Кластеризация</strong> — группировка похожих документов.</li>
                <li><strong>Рекомендации</strong> — предложение похожего контента.</li>
              </ul>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}
